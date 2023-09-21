import { City, GenderType, Province, Role } from "@prisma/client";
import * as z from "zod";

export const talentFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  middleName: z.string().optional(),
  stageName: z.string().optional(),
  gender: z.nativeEnum(GenderType),
  bodyType: z.string().optional(),
  email: z.string().email(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  height: z.string(),
  bio: z
    .string()
    .min(150, { message: "Your bio must be at least 150 characters" }),
  images: z.object({ url: z.string() }).array(),
  city: z.nativeEnum(City),
  province: z.nativeEnum(Province).optional(),
  agency: z.string().optional(),
  performerType: z.nativeEnum(Role),
});

export type TalentFormValues = z.infer<typeof talentFormSchema>;