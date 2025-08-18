"use server";

import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Task from "@/models/Task";
import { TaskType } from "@/models/Task";
import { cookies } from "next/headers";

export async function getTasks(columnId: string) {
  await connectDB();
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;

  const tasksDoc = await Task.find({
    userId,
    columnId,
  })
    .sort({ updatedAt: 1 })
    .lean();
  const tasks = convertToObject(tasksDoc) as TaskType[];

  return tasks;
}
