"use server";

import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Column, { ColumnType } from "@/models/Column";

export async function getColumns(boardId: string | null) {
  await connectDB();
  const columnsDoc = await Column.find({ boardId }).lean();
  const columns = convertToObject(columnsDoc) as ColumnType[];
  return columns;
}
