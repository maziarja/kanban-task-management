"use server";

import { type ColumnStateType } from "@/app/_components/AddNewBoardModal";
import connectDB from "@/config/database";
import Board from "@/models/Board";
import Column from "@/models/Column";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createNewBoard(
  boardName: string,
  columns: ColumnStateType[],
) {
  await connectDB();
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;

  // Validation
  if (boardName === "") return { error: { boardName: "Can't be empty" } };
  if (columns.some((col) => col.name === ""))
    return { error: { column: "Can't be empty" } };

  // Add board
  const newBoard = new Board({
    name: boardName,
    userId,
  });
  await newBoard.save();

  // Add columns
  if (columns.length > 0) {
    await Column.insertMany(
      columns.map((col) => ({
        name: col.name,
        boardId: newBoard._id,
        userId,
      })),
    );
  }

  // await new Promise<void>((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 6000);
  // });

  revalidatePath("/");

  return {
    success: true,
    boardId: newBoard._id.toString(),
  };
}
