"use server";

import { clerkClient } from "@clerk/nextjs";

export const getTalentUser = async (talentId: string) => {
  const talentUser = await clerkClient.users.getUser(talentId);

  return talentUser;
};
