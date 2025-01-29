"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function loginUser(payload: { email: string; password: string }) {
  try {
    const user = await prisma.agent.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const isValid = await bcrypt.compare(payload?.password, user?.password);

    if (!isValid) {
      return { error: "Invalid password" };
    }

    revalidatePath("/");

    return { user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to login" };
  }
}
