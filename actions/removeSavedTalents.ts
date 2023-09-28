"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

export const removeSavedTalents = async (talentProfileId: string[]) => {
  const user = await currentUser();

  if (!user?.id || !user) return console.log("User ID is missing");
  if (!talentProfileId) return console.log("Talent ID is missing");

  try {
    const removedSavedTalents = await prisma.userSavedTalent.update({
      where: {
        userId: user.id,
      },
      data: {
        savedTalents: {
          deleteMany: talentProfileId
            .filter((id) => id !== undefined)
            .map((id) => ({ talentProfileId: id })),
        },
      },
    });

    return removedSavedTalents;
  } catch (error) {
    return console.log("Error updating savedTalent: " + error);
  }
};
