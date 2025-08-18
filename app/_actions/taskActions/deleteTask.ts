"use server";

import connectDB from "@/config/database";
import Subtask from "@/models/Subtask";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteTask(taskId: string) {
  await connectDB();
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;
  const task = await Task.findById(taskId);
  if (userId !== task.userId) throw new Error("Access denied");

  // Delete related subtasks
  await Subtask.deleteMany({ taskId });

  // Delete task
  await Task.findByIdAndDelete(taskId);

  revalidatePath("/");

  return { success: true };
}
