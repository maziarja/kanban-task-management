import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // adjust path if needed
// importData.ts
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
// This replaces __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Connect to MongoDB
// await mongoose.connect("mongodb://localhost:27017/kanban-task-management");

// Load models
import Board from "./models/Board";
import Column from "./models/Column";
import Task from "./models/Task";
import Subtask from "./models/Subtask";
import connectDB from "./config/database";
import { fileURLToPath } from "url";

await connectDB();
async function importJSON() {
  const filePath = path.join(__dirname, "data.json");
  const file = await fs.readFile(filePath, "utf-8");
  const { boards } = JSON.parse(file);

  for (const board of boards) {
    const newBoard = await Board.create({ name: board.name, isInitial: true });

    for (const column of board.columns) {
      const newColumn = await Column.create({
        name: column.name,
        boardId: newBoard._id,
      });

      for (const task of column.tasks) {
        const newTask = await Task.create({
          title: task.title,
          description: task.description,
          columnId: newColumn._id,
          status: column.name,
        });

        for (const subtask of task.subtasks) {
          await Subtask.create({
            title: subtask.title,
            isCompleted: subtask.isCompleted,
            taskId: newTask._id,
          });
        }
      }
    }
  }

  console.log("✅ Data imported successfully.");
  mongoose.disconnect();
}

importJSON().catch((err) => {
  console.error("❌ Import failed:", err);
  mongoose.disconnect();
});
