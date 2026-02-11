"use server";

import { db } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function createOnRamptxn(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();

  const userIdString = session?.user?.id;
  if (!userIdString) {
    return {
      message: "user not logged in",
    };
  }

  const userId = parseInt(userIdString);

  await db.onRampTransaction.create({
    data: {
      userId,
      amount: amount,
      status: "Pending",
      startTime: new Date(),
      provider,
      token: token,
    },
  });

  return {
    message: "onRamp transaction added",
  };
}
