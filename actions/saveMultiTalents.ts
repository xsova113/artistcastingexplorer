"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

const saveMultiTalents = async (talentProfileId: string[]) => {
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

  // If savedTalent exists but talent ID is not saved
  const updateSavedTalents = async (id: string) => {
    if (
      !userSavedTalent.savedTalents
        .map((talent) => talent.talentProfileId)
        .includes(id)
    ) {
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
    }
  };

  talentProfileId
    .map((talentId) => talentId)
    .forEach((id) => {
      updateSavedTalents(id);
    });

  // If savedTalent exists on current user, then update it
  const removeSavedTalents = async (id: string) => {
    if (
      userSavedTalent.savedTalents
        .map((talent) => talent.talentProfileId)
        .includes(id)
    ) {
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
    }
  };

  talentProfileId
    .map((talentId) => talentId)
    .forEach((id) => {
      removeSavedTalents(id);
    });
};

export default saveMultiTalents;
