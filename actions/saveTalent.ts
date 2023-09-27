"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

const saveTalent = async (talentId: string) => {
  const user = await currentUser();

  if (!user?.id || !user) return console.log("User ID is missing");
  if (!talentId) return console.log("Talent ID is missing");

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
          savedTalents: { create: { talentProfileId: talentId } },
        },
      });

      return favouritedTalent;
    } catch (error) {
      return console.log("Error creating favourtedTalent: " + error);
    }
  }

  // If savedTalent exists but talent ID is not saved
  if (
    userSavedTalent &&
    !userSavedTalent.savedTalents
      .map((talent) => talent.talentProfileId)
      .includes(talentId)
  ) {
    try {
      const updatedSavedTalents = await prisma.userSavedTalent.update({
        where: {
          userId: user.id,
        },
        data: {
          savedTalents: {
            create: { talentProfileId: talentId },
          },
        },
      });

      return updatedSavedTalents;
    } catch (error) {
      console.log("Error updating savedTalent: " + error);
    }
  }

  // If savedTalent exists on current user, then update it
  if (
    userSavedTalent.savedTalents
      .map((talent) => talent.talentProfileId)
      .includes(talentId)
  ) {
    try {
      const removedSavedTalents = await prisma.userSavedTalent.update({
        where: {
          userId: user.id,
        },
        data: {
          savedTalents: { deleteMany: { talentProfileId: talentId } },
        },
      });

      return removedSavedTalents;
    } catch (error) {
      return console.log("Error updating savedTalent: " + error);
    }
  }
};

export default saveTalent;
