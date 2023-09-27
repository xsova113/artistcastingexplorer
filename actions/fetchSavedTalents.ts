"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

export const fetchSavedTalents = async () => {
  const { userId } = auth();

  if (!userId) return;

  const response = await prisma.userSavedTalent.findUnique({
    where: {
      userId,
    },
    include: {
      savedTalents: true,
    },
  });

  if (!response) return console.log("No savedTalents found");

  return response;
};
