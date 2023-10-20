"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

export const removeTalentByUser = async ({
  talentIds,
}: {
  talentIds: string[];
}) => {
  try {
    const { userId } = auth();

    if (!userId) throw new Error("You are not logged in or unauthorized.");
    if (!talentIds) throw new Error("No talent IDs found.");

    await prisma.savedByUser.deleteMany({
      where: {
        AND: [
          {
            talentProfileId: {
              in: talentIds.filter((id) => id !== undefined),
            },
          },
          {
            userId,
          },
        ],
      },
    });

    return { message: "Unsaved talents successfully" };
  } catch (error: any) {
    throw new Error("Failed to save talents: " + error.message);
  }
};
