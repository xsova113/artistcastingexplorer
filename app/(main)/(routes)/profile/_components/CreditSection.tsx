"use client";

import FlexBetween from "@/components/FlexBetween";
import { TalentProfileType } from "@/types/talentProfileType";
import "@uploadthing/react/styles.css";
import CreditFormDialog from "./CreditFormDialog";
import { Plus } from "lucide-react";
import CreditAccordian from "./CreditAccordian";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

interface CreditSectioinProps {
  talent: TalentProfileType;
}

const CreditSection = ({ talent }: CreditSectioinProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Accordion
      type="single"
      collapsible
      className="mt-4 basis-full rounded-lg border p-3 shadow"
    >
      <AccordionItem value="credit" className="border-none">
        <AccordionTrigger className="hover:no-underline">
          <FlexBetween className="mr-3">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold">Credits</h1>
              <span className="px-2 text-xl font-bold text-muted-foreground">
                •
              </span>
              <span className="text-lg font-medium">
                {talent.credits.length}
              </span>
            </div>

            <CreditFormDialog talent={talent}>
              <Plus size={16} className="mr-1" /> Add
            </CreditFormDialog>
          </FlexBetween>
        </AccordionTrigger>

        <AccordionContent>
          {(talent.credits.length === 0 || !talent.credits.length) && (
            <span className="flex justify-center pt-4">No results</span>
          )}

          <div className="mt-6 flex flex-col gap-3">
            {talent.credits.map((item) => (
              <CreditAccordian key={item.id} talent={talent} data={item} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CreditSection;
