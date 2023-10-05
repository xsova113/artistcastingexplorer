"use server";

import prisma from "@/lib/client";
import { TalentFormValues } from "@/lib/talentFormSchema";
import { TalentProfile } from "@prisma/client";

export const createTalent = async (
  values: TalentFormValues,
  userId?: string,
): Promise<TalentProfile | undefined> => {
  if (!userId) {
    console.log("User ID is missing");
  } else {
    try {
      const talent = await prisma.talentProfile.create({
        data: {
          userId: userId,
          bio: values.bio,
          dob: values.dob,
          performerType: { create: { role: values.performerType } },
          email: values.email,
          firstName: values.firstName,
          height: values.height,
          gender: { create: { gender: values.gender } },
          lastName: values.lastName,
          agency: values.agency,
          bodyType: values.bodyType,
          skills: { createMany: { data: values.skills } },
          middleName: values.middleName,
          stageName: values.stageName,
          images: { createMany: { data: values.images } },
          location: {
            create: {
              city: values.city,
            },
          },
        },
      });

      return talent;
    } catch (error: any) {
      console.log("Error submitting: ", error);
    }
  }
};
