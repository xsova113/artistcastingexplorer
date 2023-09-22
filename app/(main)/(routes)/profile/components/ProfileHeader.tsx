import Stack from "@/components/Stack";
import { cn } from "@/lib/utils";
import { User } from "@clerk/nextjs/server";
import {
  Image as File,
  Gender,
  Location,
  PerformerType,
  TalentProfile,
} from "@prisma/client";
import Image from "next/image";

interface ProfileHeaderProps {
  talentUser: User;
  talent: TalentProfile & {
    images: File[];
    location: Location;
    performerType: PerformerType;
    gender: Gender;
  };
}

const ProfileHeader = async ({ talentUser, talent }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex h-[125px] w-[125px]">
        {!talentUser.imageUrl ? (
          <span className="self-center text-center text-muted-foreground">
            Upload a profile image in &quot;Manage Account&quot;
          </span>
        ) : (
          <Image
            src={talentUser.imageUrl}
            alt={"talent image"}
            fill
            className="rounded-full object-cover"
          />
        )}
      </div>
      <Stack className="gap-4">
        <h1 className="text-2xl font-semibold">
          {talent.firstName} {talent.lastName}
        </h1>
        <Stack className="text-muted-foreground md:gap-2">
          <h2 className="flex gap-3 capitalize">
            {talent.performerType.role.toLowerCase().replaceAll("_", " ")}
            <span className="font-medium">|</span>
            {talent.location.city?.toLocaleLowerCase()}
          </h2>
          <h3 className="flex gap-3 capitalize ">
            {talent.gender.gender.toLocaleLowerCase()}
            <span className={cn("font-medium", !talent.stageName && "hidden")}>
              |
            </span>
            {talent.stageName ? talent.stageName : null}
          </h3>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProfileHeader;
