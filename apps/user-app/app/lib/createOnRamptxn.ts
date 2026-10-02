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



  console.log("befire")
  const userId = parseInt(userIdString);
  console.log("After")

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

  console.log("Created onRamp transaction with token:", token);
  console.log("sanjayy1")
  console.log("sanjauy22222")

  console.log("oru naal intha nilam enakku sikkum,sikkuchu nee setha")

  console.log("sanjau raj will rockkkk")
  console.log("token:", token);
  return {
    message: "onRamp transaction added",
  };
}
