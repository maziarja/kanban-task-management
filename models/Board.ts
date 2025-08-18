import mongoose, { model, Schema } from "mongoose";

export type BoardType = {
  name: string;
  userId: string;
  isInitial?: boolean;
  createdAt: Date;
  _id: string;
} & Document;

const boardSchema = new Schema(
  {
    name: String,
    userId: String,
    isInitial: Boolean,
  },
  {
    timestamps: true,
  },
);

// const Board: Model<BoardType> =
//   models?.Board || model<BoardType>("Boards", boardSchema);
const Board = mongoose.models.Board || model("Board", boardSchema);
export default Board;
