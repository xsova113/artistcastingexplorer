"use server";

import checkTalent from "@/lib/checkTalent";
import prisma from "@/lib/client";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";

type SavedFilter = {
  name: string;
  queryPathname: string;
};

export const createSavedFilter = async ({
  name,
  queryPathname,
}: SavedFilter) => {
  const isPremium = await checkSubscription();
  const { userId } = auth();
  const isTalent = await checkTalent();

  if (!isPremium && !isTalent)
    return console.log("User is not on premium plan");
  if (!userId) return console.log("User ID is missing");

  const userSavedFilter = await prisma.userSavedFilter.findUnique({
    where: {
      userId,
    },
  });

  if (!userSavedFilter) {
    try {
      const newUserSavedFilter = await prisma.userSavedFilter.create({
        data: {
          userId,
          savedFilters: {
            create: {
              name,
              queryPathname,
            },
          },
        },
      });

      return newUserSavedFilter;
    } catch (error) {
      console.log("Error creating savedfilter: " + error);
    }
  } else {
    const updatedUserSavedFilter = await prisma.userSavedFilter.update({
      where: {
        userId,
      },
      data: {
        userId,
        savedFilters: {
          create: {
            name,
            queryPathname,
          },
        },
      },
    });
    return updatedUserSavedFilter;
  }
};
