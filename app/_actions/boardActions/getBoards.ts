"use server";

import connectDB from "@/config/database";
import Board from "@/models/Board";
import { cookies } from "next/headers";

export async function getBoards() {
  await connectDB();
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const boards = await Board.find({ userId }).lean();
  return boards;
}
