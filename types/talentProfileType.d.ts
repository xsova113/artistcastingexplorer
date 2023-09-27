import {
  Gender,
  Image,
  Location,
  PerformerType,
  Skill,
  TalentProfile,
} from "@prisma/client";

export type TalentProfileType = TalentProfile & {
  images: Image[];
  location: Location;
  performerType: PerformerType;
  gender: Gender;
  skills: Skill[];
};
