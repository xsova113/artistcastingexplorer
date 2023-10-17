"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "./client";
import { useQuery } from "react-query";
import { api } from "@/convex/_generated/api";

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
