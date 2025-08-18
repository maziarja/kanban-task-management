"use server";

import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Column, { ColumnType } from "@/models/Column";

export async function getColNameAndId(boardId: string) {
  await connectDB();
  const columnsDoc = await Column.find(
    { boardId },
    { name: 1 }, // projection: include 'name' and '_id' (by default _id is included)
  ).lean();

  const columns = convertToObject(columnsDoc) as ColumnType[];

  return columns;
}
