"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

export const approveTalent = async (id: string[]) => {
  const { userId } = auth();

  try {
    if (!userId) return console.log("User ID is missing");
    if (!id) return console.log("Talent ID is missing");

    const approvedTalent = await prisma.talentProfile.updateMany({
      where: { id: { in: id } },
      data: { isApproved: true },
    });

    return approvedTalent;
  } catch (error: any) {
    console.log("Error approving talent: " + error.message);
  }
};

export const rejectTalent = async (id: string[]) => {
  const { userId } = auth();

  try {
    if (!userId) return console.log("User ID is missing");
    if (!id) return console.log("Talent ID is missing");

    const rejectedTalent = await prisma.talentProfile.updateMany({
      where: { id: { in: id } },
      data: { isApproved: false },
    });

    return rejectedTalent;
  } catch (error: any) {
    console.log("Error approving talent: " + error.message);
  }
};
