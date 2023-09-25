"use client";

import Stack from "@/components/Stack";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TalentProfileType } from "@/types/talentProfileType";
import { useCallback, useEffect, useState } from "react";
import ProfileHeader from "../../profile/components/ProfileHeader";
import { Separator } from "@/components/ui/separator";
import TalentMedias from "../../profile/components/TalentMedias";
import TalentBio from "../../profile/components/TalentBio";
import { getTalentUser } from "@/actions/getTalentUser";
import { User } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";

interface TalentDetailSheetProps {
  talent: TalentProfileType;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const TalentDetailSheet = ({
  talent,
  isOpen,
  setIsOpen,
}: TalentDetailSheetProps) => {
  const [talentUser, setTalentUser] = useState<User>();

  const fetchTalentUser = useCallback(async () => {
    const data = await getTalentUser(talent.userId);
    setTalentUser(data);
  }, [talent]);

  useEffect(() => {
    fetchTalentUser();
  }, [fetchTalentUser]);

  if (!talentUser) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={cn(
          "max-sm:text-xs",
          buttonVariants({ variant: "outline", size: "sm" }),
        )}
      >
        Detail
      </SheetTrigger>
      <SheetContent className="min-w-[340px] overflow-x-scroll p-0 md:min-w-[800px] lg:min-w-[1000px]">
        <Stack className="px-6 py-20 md:px-20">
          <ProfileHeader talentUser={talentUser} talent={talent} />
          <span className="mt-4 text-sm">
            {talentUser.emailAddresses[0].emailAddress}
          </span>
          <Separator className="mt-8" />
          <div className="mt-10 flex flex-col-reverse gap-x-14 gap-y-10 md:flex-row lg:mt-20">
            <TalentMedias medias={talent.images.map((image) => image.url)} />
            <TalentBio talent={talent} />
          </div>
        </Stack>
      </SheetContent>
    </Sheet>
  );
};

export default TalentDetailSheet;
