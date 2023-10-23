"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

export const saveTalentByUser = async ({
  talentIds,
}: {
  talentIds: string[];
}) => {
  try {
    const { userId } = auth();

    if (!userId) throw new Error("You are not logged in or unauthorized.");
    if (!talentIds) throw new Error("No talent IDs found.");

    const talentsNotSavedByUser = await prisma.talentProfile.findMany({
      where: {
        AND: [
          { id: { in: talentIds.filter((id) => id !== undefined) } },
          { savedByUsers: { none: { userId } } },
        ],
      },
      include: { savedByUsers: true },
    });

    if (talentsNotSavedByUser.length === 0) {
      throw new Error("Talents already saved.");
    }

    await prisma.savedByUser.createMany({
      data: talentsNotSavedByUser.map((talent) => ({
        talentProfileId: talent.id,
        userId,
      })),
    });

    return { message: "Saved talents successfully" };
  } catch (error: any) {
    throw new Error("Failed to save talents: " + error.message);
  }
};
