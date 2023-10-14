import {
  Credit,
  Gender,
  Image,
  Location,
  PerformerType,
  Skill,
  TalentProfile,
  Video,
} from "@prisma/client";

export type TalentProfileType = TalentProfile & {
  images: Image[];
  videos: Video[];
  location: Location;
  performerType: PerformerType;
  gender: Gender;
  skills: Skill[];
  credits: Credit[];
};
