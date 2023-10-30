import {
  BodyType,
  City,
  GenderType,
  JapaneseLevel,
  Language,
  Province,
  Role,
} from "@prisma/client";
import * as z from "zod";

export const talentFormSchema = z.object({
  talentUserId: z.string().optional(),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  middleName: z.string().optional(),
  stageName: z.string().optional(),
  gender: z.nativeEnum(GenderType).optional(),
  bodyType: z.nativeEnum(BodyType).optional(),
  email: z.string().email(),
  skills: z.object({ skill: z.string().nullable() }).array(),
  ageMax: z.number().optional(),
  ageMin: z.number().optional(),
  height: z.string().optional(),
  hair: z.string().optional(),
  eye: z.string().optional(),
  language: z.nativeEnum(Language),
  JapaneseLanguage: z.nativeEnum(JapaneseLevel),
  bio: z.string().optional(),
  images: z.object({ url: z.string(), fileKey: z.string() }).array(),
  videos: z
    .object({
      url: z.string(),
      fileKey: z.string(),
      name: z.string().nullable(),
    })
    .array()
    .optional(),
  city: z.nativeEnum(City),
  province: z.nativeEnum(Province).optional(),
  agency: z.string().optional(),
  performerType: z.nativeEnum(Role),
  secondaryRole: z.nativeEnum(Role).optional().nullable(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  website: z.string().optional(),
  termAcceptance: z.boolean().optional(),
  ageCheck: z.boolean().optional(),
  union: z.string().optional(),
});

export type TalentFormValues = z.infer<typeof talentFormSchema>;
