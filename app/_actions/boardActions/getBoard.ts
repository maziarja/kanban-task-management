"use server";

import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Board, { BoardType } from "@/models/Board";
import { cookies } from "next/headers";

export async function getBoard(boardId: string) {
  await connectDB();
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;

  const boardDoc = await Board.findOne({
    userId,
    _id: boardId,
  })
    .sort({ updatedAt: 1 })
    .lean();
  const board = convertToObject(boardDoc) as BoardType;

  return board;
}
