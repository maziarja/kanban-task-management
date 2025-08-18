"use server";

import { NewColumn } from "@/app/_components/UpdateBoardForm";
import { findChanges } from "@/app/helpers/findChanges";
import connectDB from "@/config/database";
import Board from "@/models/Board";
import Column from "@/models/Column";
import Subtask from "@/models/Subtask";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateBoard(
  boardId: string,
  boardName: string,
  columns: NewColumn[],
) {
  await connectDB();

  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;
  const board = await Board.findById(boardId);
  if (userId !== board.userId) throw new Error("Access denied");

  // Validation
  if (boardName === "") return { error: { boardName: "Can't be empty" } };
  if (columns.some((col) => col.name === ""))
    return { error: { column: "Can't be empty" } };

  const oldCols = await Column.find({ boardId });

  /// Update board name
  if (boardName) await Board.findByIdAndUpdate(boardId, { name: boardName });

  const result = findChanges(oldCols, columns);

  /// Add just new columns
  if (result.add.length) {
    result.add.forEach(
      async (addedCol) =>
        await Column.findByIdAndUpdate(addedCol._id, addedCol, {
          upsert: true,
        }),
    );
  }

  /// Delete just deleted columns
  if (result.delete.length) {
    result.delete.forEach(async (deletedCol) => {
      await Column.findByIdAndDelete(deletedCol._id);
      // Delete related tasks for this column
      const tasks = await Task.find({ columnId: deletedCol._id });
      await Task.deleteMany({ columnId: deletedCol._id });
      tasks.forEach(
        // Delete related subtasks for these tasks
        async (task) => await Subtask.deleteMany({ taskId: task._id }),
      );
    });
  }

  /// Update Name of columns
  columns.forEach(async (col) => {
    await Column.findByIdAndUpdate(col._id, { name: col.name });
    // Update related tasks status
    await Task.updateMany(
      { columnId: col._id },
      { status: col.name },
      { timestamps: false },
    );
  });

  revalidatePath("/");

  return { success: true };
}
