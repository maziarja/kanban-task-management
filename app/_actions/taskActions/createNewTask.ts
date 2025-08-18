"use server";

import { SubtaskStateType } from "@/app/_components/AddNewTaskModal";
import connectDB from "@/config/database";
import Column from "@/models/Column";
import Subtask from "@/models/Subtask";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type NewTask = {
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskStateType[];
  columnId?: string;
};

export async function createNewTask(newTask: NewTask) {
  await connectDB();
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;
  const column = await Column.findById(newTask.columnId);

  if (column?.userId !== userId) throw new Error("Access denied");

  // Validation
  if (newTask.title === "") return { error: { title: "Can't be empty" } };
  if (newTask.subtasks.some((subtask) => subtask.title === ""))
    return { error: { subtask: "Can't be empty" } };

  // Creating new task

  const createdTask = new Task({
    columnId: newTask.columnId,
    title: newTask.title,
    description: newTask.description,
    status: newTask.status,
    userId,
  });

  await createdTask.save();

  // Creating subtasks

  if (newTask.subtasks.length > 0) {
    const subtasks = newTask.subtasks;
    await Subtask.insertMany(
      subtasks.map((subtask) => ({
        taskId: createdTask._id,
        title: subtask.title,
        isCompleted: subtask.isCompleted,
        userId,
      })),
    );
  }

  revalidatePath("/");
  return { success: true };
}
