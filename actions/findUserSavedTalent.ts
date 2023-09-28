"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

export const findUserSavedTalent = async () => {
  const user = await currentUser();

  if (!user?.id || !user) return console.log("User ID is missing");

  const userSavedTalent = await prisma.userSavedTalent.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      savedTalents: true,
    },
  });

  return userSavedTalent;
};
