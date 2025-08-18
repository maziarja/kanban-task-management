import { model, Model, models, Schema } from "mongoose";

export type UserType = {
  userId: string;
} & Document;

const userSchema = new Schema({
  userId: String,
});

const User: Model<UserType> =
  models.User || model<UserType>("User", userSchema);

export default User;
