"use server";

import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Task, { TaskType } from "@/models/Task";

export async function getTaskById(taskId: string | null) {
  await connectDB();
  const tasksDoc = await Task.findById(taskId).lean();
  const task = convertToObject(tasksDoc) as TaskType;
  return task;
}
