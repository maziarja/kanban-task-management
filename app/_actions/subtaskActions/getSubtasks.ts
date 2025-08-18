"use server";

import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Subtask, { SubtaskType } from "@/models/Subtask";

export async function getSubtasks(taskId: string | null) {
  await connectDB();
  const subtasksDoc = await Subtask.find({ taskId }).lean();
  const subtasks = convertToObject(subtasksDoc) as SubtaskType[];
  return subtasks;
}
