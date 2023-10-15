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
          performerType: { update: { role: values.performerType } },
          email: values.email,
          firstName: values.firstName,
          height: values.height,
          gender: { update: { gender: values.gender } },
          lastName: values.lastName,
          agency: values.agency,
          bodyType: values.bodyType,
          hairColour: values.hair,
          eyeColour: values.eye,
          middleName: values.middleName,
          stageName: values.stageName,
          language: values.language,
          japaneseLevel: values.JapaneseLanguage,
          union: values.union,
          skills: { deleteMany: {} },
          instagram: values.instagram,
          twitter: values.twitter,
          youtube: values.youtube,
          tiktok: values.tiktok,
          website: values.website,
          location: {
            update: {
              city: values.city,
              province: values.province,
            },
          },
          images: { deleteMany: {} },
          videos: { deleteMany: {} },
        },
      });

      await prisma.talentProfile.update({
        where: {
          id: talent.id,
        },
        data: {
          images: {
            createMany: {
              data: values.images.map((item) => ({
                url: item.url,
                fileKey: item.fileKey,
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
