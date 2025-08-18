"use server";

import connectDB from "@/config/database";
import Board from "@/models/Board";
import Column from "@/models/Column";
import Subtask from "@/models/Subtask";
import Task from "@/models/Task";
import User from "@/models/User";

export async function deleteAllInitialDate() {
  await connectDB();
  await Board.deleteMany();
  await Column.deleteMany();
  await Task.deleteMany();
  await Subtask.deleteMany();
  await User.deleteMany();
}
