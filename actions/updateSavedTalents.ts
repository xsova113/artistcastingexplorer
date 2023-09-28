"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

export const updateSavedTalents = async (talentProfileId: string[]) => {
  const user = await currentUser();

  if (!user?.id || !user) return console.log("User ID is missing");
  if (!talentProfileId) return console.log("Talent ID is missing");

  try {
    const updatedSavedTalents = await prisma.userSavedTalent.update({
      where: {
        userId: user.id,
      },
      data: {
        savedTalents: {
          createMany: {
            data: talentProfileId
              .filter((id) => id !== undefined)
              .map((id) => ({ talentProfileId: id })),
          },
        },
      },
    });

    return updatedSavedTalents;
  } catch (error) {
    return console.log("Error updating savedTalent: " + error);
  }
};
