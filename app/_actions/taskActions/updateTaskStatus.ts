"use server";

import connectDB from "@/config/database";
import Column from "@/models/Column";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateTaskStatus(taskId: string, status: string | null) {
  await connectDB();
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;

  if (!taskId) throw new Error("Access denied");

  const currentTask = await Task.findById(taskId).populate({
    path: "columnId",
    populate: {
      path: "boardId",
    },
  });

  if (userId !== currentTask.userId) throw new Error("Access denied");

  const currentBoardId = currentTask?.columnId?.boardId._id;

  const newColumn = await Column.findOne({
    boardId: currentBoardId,
    name: status,
  });

  await Task.findByIdAndUpdate(taskId, {
    columnId: newColumn._id,
    status,
  });

  revalidatePath("/");
}
