"use server";

import { clerkClient } from "@clerk/nextjs";
import { TalentProfile } from "@prisma/client";

export const getTalentUser = async (talentId: string) => {
  const talentUser = await clerkClient.users.getUser(talentId);

  return talentUser;
};
