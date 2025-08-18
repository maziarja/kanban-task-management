import mongoose, { Model, model, Schema, Types } from "mongoose";

export type SubtaskType = {
  title: string;
  isCompleted: boolean;
  taskId: Types.ObjectId | string;
  userId: string;
  _id: string;
  createdAt: Date;
};

const subtaskSchema = new Schema<SubtaskType & Document>(
  {
    title: String,
    isCompleted: Boolean,
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    userId: String,
  },
  {
    timestamps: true,
  },
);

// const Subtask: Model<SubtaskType> =
//   models.Subtask || model<SubtaskType>("Subtask", subtaskSchema);

const Subtask: Model<SubtaskType & Document> =
  mongoose.models?.Subtask ||
  model<SubtaskType & Document>("Subtask", subtaskSchema);

export default Subtask;
