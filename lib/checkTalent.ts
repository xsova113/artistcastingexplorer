import { auth } from "@clerk/nextjs";
import prisma from "./client";

const checkTalent = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const talents = await prisma.talentProfile.findUnique({
    where: { userId },
  });

  if (!talents) {
    return false;
  } else {
    return true;
  }
};

export default checkTalent;
