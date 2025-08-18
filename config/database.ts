import mongoose from "mongoose";

let connected = false;

const connectDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  //   if db connected do not connected again
  if (connected) {
    console.log("Database is already connected");
    return;
  }
  // connect to db
  const uri = process.env.DATABASE_URI;
  if (!uri) {
    throw new Error("DATABASE_URI is not defined in environment variables");
  }

  try {
    mongoose.connect(uri);
    connected = true;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
};

export default connectDB;
