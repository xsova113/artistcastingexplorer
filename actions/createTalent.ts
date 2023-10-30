"use server";

import prisma from "@/lib/client";
import { sendEmail } from "@/lib/sendgrid";
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
          performerType: {
            create: {
              role: values.performerType,
              secondaryRole: values.secondaryRole,
            },
          },
          email: values.email,
          firstName: values.firstName,
          height: values.height,
          gender: values.gender,
          lastName: values.lastName,
          agency: values.agency,
          ageMax: values.ageMax,
          ageMin: values.ageMin,
          bodyType: values.bodyType ? values.bodyType : undefined,
          hairColour: values.hair,
          eyeColour: values.eye,
          instagram: values.instagram,
          twitter: values.twitter,
          youtube: values.youtube,
          tiktok: values.tiktok,
          website: values.website,
          skills:
            !values.skills || values.videos?.length === 0
              ? {}
              : { createMany: { data: values.skills } },
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

      if (!talent) throw new Error("Faild to create a new profile.");

      await sendEmail({
        subject: "New Talent Form Sign Up",
        to: ["info@artistcastingexplorer.com", "xsova113@gmail.com"],
        templateId: "d-790443c21bc24d789de4142aac5b25ea",
        name: values.firstName + " " + values.lastName,
        userEmail: values.email,
      });

      return talent;
    } catch (error: any) {
      console.log("Error submitting: ", error);
    }
  }
};
