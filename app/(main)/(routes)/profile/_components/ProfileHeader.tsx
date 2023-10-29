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
import { Instagram, LinkIcon, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useContactModalStore } from "@/hooks/useContactModalStore";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";

interface ProfileHeaderProps {
  talentUser: User;
  talent: TalentProfileType;
}

const ProfileHeader = ({ talentUser, talent }: ProfileHeaderProps) => {
  const { userId, orgRole, isSignedIn } = useAuth();
  const { setOpen, setTalent } = useContactModalStore();
  const { onOpen } = useSignInAlertStore();

  return (
    <div className="mt-12 flex items-start gap-4">
      <div className="relative flex h-[125px] w-[125px]">
        <Image
          src={talent.images[0].url}
          alt={"Main talent image"}
          fill
          className="rounded-full object-cover"
        />
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
        <Stack className="rounded text-sm text-muted-foreground md:gap-2">
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
            {!talent.gender ? null : talent.gender?.toLocaleLowerCase()}
            <span className={cn("font-medium", !talent.stageName && "hidden")}>
              |
            </span>
            {talent.stageName ? talent.stageName : null}
            <span
              className={cn(
                "font-medium",
                !talent.ageMin && !talent.ageMax && "hidden",
              )}
            >
              |
            </span>
            {talent.ageMin && talent.ageMax ? (
              <span>{`${talent.ageMin} - ${talent.ageMax}`}</span>
            ) : null}
          </h3>
        </Stack>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {talent.instagram && (
              <Link
                target="_blank"
                href={talent.instagram}
                className="transition hover:-translate-y-1"
              >
                <Instagram />
              </Link>
            )}
            {talent.twitter && (
              <Link
                target="_blank"
                href={talent.twitter}
                className="transition hover:-translate-y-1"
              >
                <FaXTwitter size={23} />
              </Link>
            )}
            {talent.youtube && (
              <Link
                target="_blank"
                href={talent.youtube}
                className="transition hover:-translate-y-1"
              >
                <Youtube />
              </Link>
            )}
            {talent.tiktok && (
              <Link
                target="_blank"
                href={talent.tiktok}
                className="transition hover:-translate-y-1"
              >
                <FaTiktok />
              </Link>
            )}
            {talent.website && (
              <Link
                target="_blank"
                href={talent.website}
                className="transition hover:-translate-y-1"
              >
                <LinkIcon />
              </Link>
            )}
          </div>

          <div className="flex gap-x-2">
            {(orgRole === "admin" || userId === talentUser.id) && (
              <TalentFormModal talentUser={talentUser} talent={talent} />
            )}
            {userId !== talentUser.id && isSignedIn && (
              <Button
                size={"sm"}
                onClick={() => {
                  if (!isSignedIn) return onOpen;
                  setOpen(true);
                  setTalent({ name: talent.firstName, email: talent.email });
                }}
              >
                Contact
              </Button>
            )}
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default ProfileHeader;
