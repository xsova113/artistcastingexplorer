"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  FileTerminal,
  Filter,
  FilterX,
  LucideMenu,
  MenuSquare,
  SearchCode,
  SearchSlash,
  Settings,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import FilterForm from "./FilterForm";

const FilterAccordian = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Accordion
      type="single"
      collapsible
      className="lg:w-4/6 w-11/12 px-6 rounded-lg mb-10 bg-primary-foreground drop-shadow transition-all"
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger
          onClick={() => setIsShow((prev) => !prev)}
          className="no-underline focus:no-underline"
        >
          <span className="flex items-center gap-x-1">
            <Settings2 />Filter
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
