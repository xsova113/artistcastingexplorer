import prisma from "@/lib/client";

export const getTalentProfile = async (id: string) => {
  try {
    if (!id) {
      console.log("Talent ID is missing.");
    } else {
      const talentProfile = await prisma.talentProfile.findUnique({
        where: {
          id,
        },
        include: {
          images: true,
          location: true,
          performerType: true,
          gender: true,
        },
      });

      return talentProfile;
    }
  } catch (error) {
    console.log("Error getting talent profile: " + error);
  }
};