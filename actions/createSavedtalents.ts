"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

const createSavedTalents = async (talentProfileId: string[]) => {
  const user = await currentUser();

  if (!user?.id || !user) return console.log("User ID is missing");
  if (!talentProfileId) return console.log("Talent ID is missing");

  const userSavedTalent = await prisma.userSavedTalent.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      savedTalents: true,
    },
  });

  // If savedTalent doesn't exist on current user, create it
  if (!userSavedTalent) {
    try {
      const favouritedTalent = await prisma.userSavedTalent.create({
        data: {
          userId: user.id,
          savedTalents: {
            createMany: {
              data: talentProfileId.map((talentId) => ({
                talentProfileId: talentId,
              })),
            },
          },
        },
      });

      return favouritedTalent;
    } catch (error) {
      return console.log("Error creating favourtedTalent: " + error);
    }
  }
};

export default createSavedTalents;
