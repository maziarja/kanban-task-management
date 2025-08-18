import mongoose, { model, Schema } from "mongoose";

export type ColumnType = {
  name: string;
  boardId: string;
  _id: string;
  userId: string;
  createdAt: Date;
} & Document;

const columnSchema = new Schema(
  {
    name: String,
    boardId: { type: Schema.Types.ObjectId, ref: "Board" },
    userId: String,
  },
  {
    timestamps: true,
  },
);

// const Column: Model<ColumnType> =
//   models.Column || model<ColumnType>("Column", columnSchema);

const Column = mongoose.models?.Column || model("Column", columnSchema);
export default Column;
