"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import FilterForm from "./FilterForm";

const FilterAccordian = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto mb-10 w-11/12 rounded-lg bg-primary-foreground px-6 drop-shadow transition-all"
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger
          onClick={() => setIsShow((prev) => !prev)}
          className="no-underline focus:no-underline"
        >
          <span className="flex items-center gap-x-1">
            <Settings2 />
            Filter
          </span>
        </AccordionTrigger>
        {isShow && <Separator className="mb-4" />}
        <AccordionContent>
          <FilterForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordian;
