"use server";

import { auth } from "@clerk/nextjs";
import prisma from "./client";

const checkTalent = async () => {
  const { userId } = auth();

  if (!userId) return;

  const talent = await prisma.talentProfile.findUnique({
    where: { userId },
  });

  if (!talent) return;

  return talent;
};

export default checkTalent;
