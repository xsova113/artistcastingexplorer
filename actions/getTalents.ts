"use server";

import prisma from "@/lib/client";
import { TalentProfileType } from "@/types/talentProfileType";

export const getTalents = async (): Promise<
  TalentProfileType[] | undefined
> => {
  try {
    const recentlyUpdatedTalents = await prisma.talentProfile.findMany({
      include: {
        images: true,
        videos: true,
        location: true,
        performerType: true,
        skills: true,
        credits: true,
        savedByUsers: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return recentlyUpdatedTalents;
  } catch (error) {
    console.log("Error fetching talents data: " + error);
  }
};
