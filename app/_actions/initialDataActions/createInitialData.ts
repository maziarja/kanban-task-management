"use server";

import connectDB from "@/config/database";
import Board from "@/models/Board";
import Column from "@/models/Column";
import Subtask from "@/models/Subtask";
import Task from "@/models/Task";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function createInitialData() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) throw new Error("Access denied");

  await connectDB();

  // Create user
  const newUser = new User({
    userId,
  });
  await newUser.save();

  // Create new Initial data for new user
  const initialBoards = await Board.find({ isInitial: true });
  for (const board of initialBoards) {
    const newBoard = await new Board({
      name: board.name,
      userId,
    }).save();

    const initialColumns = await Column.find({ boardId: board._id });
    for (const column of initialColumns) {
      const newColumn = await new Column({
        name: column.name,
        boardId: newBoard._id,
        userId,
      }).save();

      const initialTask = await Task.find({ columnId: column._id });
      // const initialTask = await Task.find({ status: column.name });

      for (const task of initialTask) {
        const newTask = await new Task({
          columnId: newColumn._id,
          title: task.title,
          description: task.description,
          status: task.status,
          userId,
        }).save();

        const initialSubtask = await Subtask.find({ taskId: task.id });

        for (const task of initialSubtask) {
          await new Subtask({
            taskId: newTask._id,
            isCompleted: task.isCompleted,
            title: task.title,
            userId,
          }).save();
        }
      }
    }
  }
}
