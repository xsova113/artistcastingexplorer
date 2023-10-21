"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

export const fetchSavedByUser = async (id: string) => {
  const { userId } = auth();
  if (!userId) return;

  const savedByUser = await prisma.savedByUser.findMany({
    where: { talentProfileId: id },
  });

  return savedByUser;
};
