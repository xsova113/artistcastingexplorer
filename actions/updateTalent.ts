"use server";

import prisma from "@/lib/client";
import { TalentFormValues } from "@/lib/talentFormSchema";
import { TalentProfile } from "@prisma/client";

export const updateTalent = async (
  values: TalentFormValues,
  userId?: string,
): Promise<TalentProfile | undefined> => {
  if (!userId) {
    console.log("User ID is missing");
  } else {
    try {
      const talent = await prisma.talentProfile.update({
        where: {
          userId,
        },
        data: {
          userId: userId,
          bio: values.bio,
          dob: values.dob,
          performerType: { update: { role: values.performerType } },
          email: values.email,
          firstName: values.firstName,
          height: values.height,
          gender: { update: { gender: values.gender } },
          lastName: values.lastName,
          agency: values.agency,
          bodyType: values.bodyType,
          middleName: values.middleName,
          stageName: values.stageName,
          ageMax: values.ageMax,
          ageMin: values.ageMin,
          skills: { deleteMany: {} },
          location: {
            update: {
              city: values.city,
            },
          },
          images: { deleteMany: {} },
        },
      });

      await prisma.talentProfile.update({
        where: {
          id: talent.id,
        },
        data: {
          images: {
            createMany: { data: values.images },
          },
          skills: {
            createMany: { data: values.skills },
          },
        },
      });

      return talent;
    } catch (error: any) {
      console.log("Error updating: ", error);
    }
  }
};