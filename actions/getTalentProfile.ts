import prisma from "@/lib/client";

export const getTalentProfile = async (id: string) => {
  try {
    if (!id) return console.log("Talent ID is missing.");

    const talentProfile = await prisma.talentProfile.findUnique({
      where: {
        id,
      },
    });

    if (!talentProfile) return console.log("Can not find talent profile.");

    return talentProfile;
  } catch (error) {
    console.log("Error getting talent profile: " + error);
  }
};
