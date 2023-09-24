import { City, Province, Role } from "@prisma/client";
import { z } from "zod";

export const filterFormSchema = z.object({
  gender: z.string().optional(),
  ageRange: z.number().array().optional(),
  heightRange: z.number().array().optional(),
  city: z.nativeEnum(City).optional(),
  province: z.nativeEnum(Province).optional(),
  name: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});
