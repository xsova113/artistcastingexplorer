import {
  Credit,
  Gender,
  Image,
  Location,
  PerformerType,
  SavedByUser,
  Skill,
  TalentProfile,
  Video,
} from "@prisma/client";

export type TalentProfileType = TalentProfile & {
  images: Image[];
  videos: Video[];
  location: Location;
  performerType: PerformerType;
  gender: Gender | null;
  skills: Skill[];
  credits: Credit[];
  savedByUsers?: SavedByUser[]
};
