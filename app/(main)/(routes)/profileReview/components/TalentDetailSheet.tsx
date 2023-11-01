"use client";

import Stack from "@/components/Stack";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TalentProfileType } from "@/types/talentProfileType";
import { useCallback, useEffect, useState } from "react";
import ProfileHeader from "../../profile/_components/ProfileHeader";
import { Separator } from "@/components/ui/separator";
import TalentMedia from "../../profile/_components/TalentMedia";
import TalentBio from "../../profile/_components/TalentBio";
import { getTalentUser } from "@/actions/getTalentUser";
import { User } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";
import CreditSection from "../../profile/_components/CreditSection";

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
      <SheetContent className="min-w-[340px] overflow-x-scroll p-0 md:min-w-[750px] lg:min-w-[1000px]">
        <Stack className="px-6 py-20 md:px-20">
          <ProfileHeader talentUser={talentUser} talent={talent} />
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground md:flex-row">
            <span>
              <b className="text-foreground">Email</b>: {talent.email}
            </span>
          </div>

          <Separator className="mt-8" />
          <div className="mt-10 flex flex-col-reverse gap-x-4 gap-y-6 md:flex-row lg:mt-20">
            <TalentMedia
              images={talent.images.map((image) => image.url)}
              talent={talent}
            />
            <div className="w-full md:w-[75%]">
              <TalentBio talent={talent} />
              <CreditSection talent={talent} />
            </div>
          </div>
        </Stack>
      </SheetContent>
    </Sheet>
  );
};

export default TalentDetailSheet;
