import prisma from "@/lib/client";
import {
  TalentProfile,
  Gender,
  Image,
  PerformerType,
  Location,
} from "@prisma/client";

export const getTalents = async (): Promise<
  | (TalentProfile & {
      images: Image[];
      location: Location;
      performerType: PerformerType;
      gender: Gender;
    })[]
  | undefined
> => {
  try {
    const talents = await prisma.talentProfile.findMany({
      include: {
        images: true,
        gender: true,
        location: true,
        performerType: true,
      },
    });

    if (talents.length === 0) {
      console.log("Can not find any talents.");
    } else {
      return talents;
    }
  } catch (error) {
    console.log("Error fetching talents data: " + error);
  }
};
