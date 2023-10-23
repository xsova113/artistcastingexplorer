"use server";

import prisma from "@/lib/client";
import { sendEmail } from "@/lib/sendgrid";
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

    const talents = await prisma.talentProfile.findMany({
      where: {
        id: { in: id },
      },
    });

    if (!talents) return console.log("No talent found");

    await sendEmail({
      to: talents.map((talent) => talent.email),
      subject: "Your profile has been reviewed",
      templateId: "d-26f1d7a5bc7c44e19accd7acb237c87a",
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

    const talents = await prisma.talentProfile.findMany({
      where: {
        id: { in: id },
      },
    });

    if (!talents || talents.length === 0) return console.log("No talent found");

    await sendEmail({
      to: talents.map((talent) => talent.email),
      subject: "Your profile has been reviewed",
      templateId: "d-3a18e65171de47a897844df4db1d9d6f",
    });

    return rejectedTalent;
  } catch (error: any) {
    console.log("Error approving talent: " + error.message);
  }
};
