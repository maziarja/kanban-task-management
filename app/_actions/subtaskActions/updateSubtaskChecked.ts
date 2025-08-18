"use server";
import connectDB from "@/config/database";
import Subtask from "@/models/Subtask";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateSubtaskChecked(id: string) {
  await connectDB();
  const storeCookie = await cookies();

  const subtask = await Subtask.findById(id);

  if (subtask === null) return;

  if (subtask.userId !== storeCookie.get("userId")?.value) {
    throw new Error("Access denied");
  }

  if (subtask.userId === storeCookie.get("userId")?.value) {
    subtask.isCompleted = !subtask.isCompleted;
    await subtask.save();
    revalidatePath("/");
  }
}
