"use server";

import { findChanges } from "@/app/helpers/findChanges";
import connectDB from "@/config/database";
import { ColumnType } from "@/models/Column";
import Subtask, { SubtaskType } from "@/models/Subtask";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type UpdatedTaskType = {
  title: string;
  description: string;
  subtasks: SubtaskType[];
  status: string;
  relatedColumns: ColumnType[];
};

export async function updateTask(updatedTask: UpdatedTaskType, taskId: string) {
  await connectDB();
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;
  const currentTask = await Task.findById(taskId);

  if (userId !== currentTask.userId) throw new Error("Access denied");

  // Validation
  if (updatedTask.title === "") return { error: { title: "Can't be empty" } };
  if (updatedTask.subtasks.some((subtask) => subtask.title === ""))
    return { error: { subtask: "Can't be empty" } };

  const oldSubtasks = await Subtask.find({ taskId });
  const newSubtasks = updatedTask.subtasks;

  const changes = findChanges(oldSubtasks, newSubtasks);

  // 1) Updating Task
  const newColumn = updatedTask.relatedColumns.find(
    (col) => col.name === updatedTask.status,
  );

  await Task.findByIdAndUpdate(taskId, {
    title: updatedTask.title,
    description: updatedTask.description,
    status: updatedTask.status,
    columnId: newColumn?._id,
  });

  // 2) Updating Subtasks
  /// Add just new Subtasks
  if (changes.add.length) {
    changes.add.forEach(
      async (addedSub) =>
        await Subtask.findByIdAndUpdate(addedSub._id, addedSub, {
          upsert: true,
        }),
    );
  }

  /// Delete just deleted Subtask
  if (changes.delete.length) {
    changes.delete.forEach(async (deletedSub) => {
      await Subtask.findByIdAndDelete(deletedSub._id);
    });
  }

  /// Update Name of Subtasks
  updatedTask.subtasks.forEach(
    async (sub) =>
      await Subtask.findByIdAndUpdate(sub._id, { title: sub.title }),
  );

  revalidatePath("/");
  return { success: true };
}
