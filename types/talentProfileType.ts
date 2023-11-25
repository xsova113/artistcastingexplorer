import {
  Credit,
  Image,
  Location,
  PerformerType,
  Skill,
  TalentProfile,
  Video,
} from "@prisma/client";

export type TalentProfileType = TalentProfile & {
  images: Image[];
  videos: Video[] | null;
  location: Location;
  performerType: PerformerType;
  skills: Skill[]
  credits: Credit[];
};
