import { Gender } from "@prisma/client";

export type TalentProfileType = {
  talent: TalentProfile & {
    images: File[];
    location: Location;
    performerType: PerformerType;
    gender: Gender;
  };
};
