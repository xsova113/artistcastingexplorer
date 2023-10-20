"use client";

import Stack from "@/components/Stack";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import TalentCard from "../../directory/components/TalentCard";
import { TalentProfileType } from "@/types/talentProfileType";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface DiscoverSectionProps {
  talents: TalentProfileType[] | undefined;
}

const DiscoverSection = ({ talents }: DiscoverSectionProps) => {
  const { userId } = useAuth();
  const [selectedTalentId, setSelectedTalentId] = useState<string[]>([]);
  const approvedTalents = talents?.filter(
    (talent) => talent.isApproved === true,
  );

  return (
    <Stack className="my-28 w-full items-center gap-8">
      <h1 className="text-2xl font-semibold capitalize lg:text-4xl">
        Discover Artists and Creators
      </h1>
      <p className="text-center">You can find latest profiles here</p>

      <div className="flex flex-wrap justify-center gap-4 transition-all md:gap-8">
        {approvedTalents
          ?.slice(0, 4)
          .map((item) => (
            <TalentCard
              key={item.id}
              id={item.id}
              name={item.firstName}
              title={item.performerType.role}
              location={item.location.city || item.location.province}
              ageMin={item.ageMin}
              ageMax={item.ageMax}
              data={item}
              selectedTalentId={selectedTalentId}
              image={
                item.images.filter(
                  (image) =>
                    image.url.split(".").pop() === "jpg" ||
                    image.url.split(".").pop() === "png" ||
                    image.url.split(".").pop() === "jpeg",
                )[0].url
              }
              setSelectedTalentId={setSelectedTalentId}
              userId={userId}
              discoverSection
              savedByUsers={item.savedByUsers}
            />
          ))}
      </div>
      <Link
        href="/directory"
        className={buttonVariants({
          className:
            "bg-secondary-foreground px-8 hover:bg-secondary-foreground/80",
        })}
      >
        View All
      </Link>
    </Stack>
  );
};

export default DiscoverSection;
