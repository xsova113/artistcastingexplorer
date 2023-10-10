"use client";

import FlexBetween from "@/components/FlexBetween";
import Stack from "@/components/Stack";
import { TalentProfileType } from "@/types/talentProfileType";
import "@uploadthing/react/styles.css";
import CreditFormDialog from "./CreditFormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreditAccordian from "./CreditAccordian";

interface CreditSectioinProps {
  talent: TalentProfileType;
}

const CreditSection = ({ talent }: CreditSectioinProps) => {
  return (
    <Stack className="mt-4 w-full rounded-lg border p-2 shadow">
      <FlexBetween>
        <h1 className="mb-4 text-2xl font-semibold">Credits</h1>
        <CreditFormDialog talent={talent}>
          <Plus size={16} className="mr-1" /> Add
        </CreditFormDialog>
      </FlexBetween>
      <div className="flex flex-col gap-3 mt-6">
        {talent.credits.map((item) => (
          <CreditAccordian key={item.id} talent={talent} data={item} />
        ))}
      </div>
    </Stack>
  );
};

export default CreditSection;
