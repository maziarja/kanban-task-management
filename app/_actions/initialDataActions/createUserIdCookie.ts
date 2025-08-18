"use server";

import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { createInitialData } from "./createInitialData";

export async function createUserIdCookie() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) {
    const newId = uuid();
    cookieStore.set("userId", newId, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    await createInitialData();
  }
}
