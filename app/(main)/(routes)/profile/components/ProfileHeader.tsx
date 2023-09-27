"use client";

import Stack from "@/components/Stack";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import { useAuth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  talentUser: User;
  talent: TalentProfileType;
}

const ProfileHeader = ({ talentUser, talent }: ProfileHeaderProps) => {
  const { userId, orgRole } = useAuth();
  const router = useRouter();

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
        <h1 className="items- flex flex-col gap-x-4 gap-y-1 text-2xl font-semibold md:flex-row">
          {talent.firstName} {talent.lastName}
          <Badge
            className={cn(
              userId !== talentUser.id && "hidden",
              talent.isApproved === true
                ? "bg-green-500 hover:bg-green-400"
                : talent.isApproved === false
                ? "bg-red-500 hover:bg-red-400"
                : "bg-primary",
              "w-fit",
            )}
          >
            {talent.isApproved === true
              ? "Approved"
              : talent.isApproved === false
              ? "Rejected"
              : "Pending Review"}
          </Badge>
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
            <span className={cn("font-medium")}>|</span>
            {talent.ageMin} - {talent.ageMax}
          </h3>
        </Stack>
        <Button
          size={"sm"}
          className={cn(
            "w-fit text-muted-foreground",
            userId !== talentUser.id && "hidden",
          )}
          variant={"secondary"}
          onClick={() => router.push("/talent-form")}
        >
          Edit Profile
        </Button>
      </Stack>
    </div>
  );
};

export default ProfileHeader;
