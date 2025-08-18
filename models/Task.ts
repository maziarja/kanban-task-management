import mongoose, { model, Schema } from "mongoose";

export type TaskType = {
  title: string;
  description: string;
  status: string;
  userId: string;
  columnsId: string;
  _id: string;
  createdAt: Date;
} & Document;

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    status: String,
    columnId: { type: Schema.Types.ObjectId, ref: "Column" },
    userId: String,
  },
  {
    timestamps: true,
  },
);

// const Task: Model<TaskType> =
//   models.Task || model<TaskType>("Task", taskSchema);
const Task = mongoose.models.Task || model("Task", taskSchema);
export default Task;
