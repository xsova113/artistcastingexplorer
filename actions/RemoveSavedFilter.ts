"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

export const removeSavedFilter = async (id: string) => {
  const { userId } = auth();

  if (!userId) return console.log("User ID is missing");

  const removedSavedFilter = await prisma.userSavedFilter.update({
    where: {
      userId,
    },
    data: {
      userId,
      savedFilters: {
        delete: {
          id,
        },
      },
    },
  });
  return removedSavedFilter;
};
