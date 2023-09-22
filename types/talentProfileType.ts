import { Gender, Image, Location, PerformerType, TalentProfile } from "@prisma/client";

export type TalentProfileType = TalentProfile & {
  images: Image[];
  location: Location;
  performerType: PerformerType;
  gender: Gender;
};
