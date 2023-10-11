"use client";

import Stack from "@/components/Stack";

import TalentFormModal from "@/components/modals/TalentFormModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import { useAuth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Facebook, Instagram, LinkIcon, Plus, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileHeaderProps {
  talentUser: User;
  talent: TalentProfileType;
}

const ProfileHeader = ({ talentUser, talent }: ProfileHeaderProps) => {
  const { userId, orgRole } = useAuth();

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
          {(orgRole === "admin" || userId === talentUser.id) && (
            <Badge
              className={cn(
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
          )}
        </h1>
        <Stack className="text-sm text-muted-foreground md:gap-2">
          <h2 className="flex gap-3 capitalize">
            {talent.performerType.role.toLowerCase().replaceAll("_", " ")}
            <span className="font-medium">|</span>
            <span
              className={cn(
                talent.location.city === "OTHER_PROVINCE" && "hidden",
              )}
            >
              {talent.location.city?.toLocaleLowerCase()}
            </span>

            {talent.location.province && (
              <span>
                {talent.location.province
                  ?.toLocaleLowerCase()
                  .replaceAll("_", " ")}
              </span>
            )}
          </h2>
          <h3 className="flex gap-3 capitalize ">
            {talent.gender.gender.toLocaleLowerCase()}
            <span className={cn("font-medium", !talent.stageName && "hidden")}>
              |
            </span>
            {talent.stageName ? talent.stageName : null}
            <span className={cn("font-medium")}>|</span>
            {talent.ageMin} - {talent.ageMax}
            <span className={cn("font-medium")}>|</span>
            {talent.bodyType?.toLowerCase().replaceAll("_", " ")}
          </h3>
        </Stack>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {talent.instagram && (
              <Link target="_blank" href={talent.instagram}>
                <Instagram />
              </Link>
            )}
            {talent.twitter && (
              <Link target="_blank" href={talent.twitter}>
                <FaXTwitter />
              </Link>
            )}
            {talent.youtube && (
              <Link target="_blank" href={talent.youtube}>
                <Youtube />
              </Link>
            )}
            {talent.tiktok && (
              <Link target="_blank" href={talent.tiktok}>
                <FaTiktok />
              </Link>
            )}
            {talent.website && (
              <Link target="_blank" href={talent.website}>
                <LinkIcon />
              </Link>
            )}
          </div>

          {(orgRole === "admin" || userId === talentUser.id) && (
            <TalentFormModal talentUser={talentUser} talent={talent} />
          )}
        </div>
      </Stack>
    </div>
  );
};

export default ProfileHeader;
