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
  } else if (!values.termAcceptance && !values.ageCheck) {
    console.log("Terms and conditions are not accepted");
  } else {
    try {
      const talent = await prisma.talentProfile.create({
        data: {
          userId: values.talentUserId ? values.talentUserId : userId,
          bio: values.bio,
          performerType: { create: { role: values.performerType } },
          email: values.email,
          firstName: values.firstName,
          height: values.height,
          gender: { create: { gender: values.gender } },
          lastName: values.lastName,
          agency: values.agency,
          ageMax: values.ageMax,
          ageMin: values.ageMin,
          bodyType: values.bodyType,
          skills: { createMany: { data: values.skills } },
          middleName: values.middleName,
          stageName: values.stageName,
          images: { createMany: { data: values.images } },
          language: values.language,
          japaneseLevel: values.JapaneseLanguage,
          credits: {},
          location: {
            create: {
              city: values.city,
              province: values.province,
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
