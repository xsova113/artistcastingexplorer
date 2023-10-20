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
          hairColour: values.hair,
          eyeColour: values.eye,
          instagram: values.instagram,
          twitter: values.twitter,
          youtube: values.youtube,
          tiktok: values.tiktok,
          website: values.website,
          skills: { createMany: { data: values.skills } },
          middleName: values.middleName,
          stageName: values.stageName,
          savedByUsers: {},
          images: {
            createMany: {
              data: values.images.map((image) => ({
                url: image.url,
                fileKey: image.fileKey,
              })),
            },
          },
          videos:
            !values.videos || values.videos.length === 0
              ? {}
              : {
                  createMany: {
                    data: values.videos.map((video) => ({
                      url: video.url,
                      fileKey: video.fileKey,
                      name: video.name,
                    })),
                  },
                },
          language: values.language,
          japaneseLevel: values.JapaneseLanguage,
          credits: {},
          union: values.union,
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
