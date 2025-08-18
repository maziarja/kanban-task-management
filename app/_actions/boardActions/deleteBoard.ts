"use server";

import connectDB from "@/config/database";
import Board from "@/models/Board";
import Column from "@/models/Column";
import Subtask from "@/models/Subtask";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteBoard(boardId: string) {
  await connectDB();
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;
  const board = await Board.findById(boardId);
  if (userId !== board.userId) throw new Error("Access denied");

  // Delete board
  await Board.findByIdAndDelete(boardId);
  // Delete related Columns
  const columns = await Column.find({ boardId });
  await Column.deleteMany({ boardId });
  for (const col of columns) {
    // Delete related Tasks
    const tasks = await Task.find({ columnId: col._id });
    await Task.deleteMany({ columnId: col._id });
    // Delete related Subtasks
    for (const task of tasks) {
      await Subtask.deleteMany({ taskId: task._id });
    }
  }

  revalidatePath("/");
  return { success: true };
}
