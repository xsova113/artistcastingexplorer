import prisma from "@/lib/client";

export const getTalents = async () => {
  try {
    const talents = await prisma.talentProfile.findMany({});

    if (!talents) return console.log("Can not find any talents.");

    return talents;
  } catch (error) {
    console.log("Error fetching talents data: " + error);
  }
};
