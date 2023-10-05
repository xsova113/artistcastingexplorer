"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "./client";

const checkTalent = async () => {
  const user = await currentUser();

  if (!user?.id) return;

  const talent = await prisma.talentProfile.findUnique({
    where: { userId: user.id },
  });

  if (!talent) return;

  return talent;
};

export default checkTalent;
