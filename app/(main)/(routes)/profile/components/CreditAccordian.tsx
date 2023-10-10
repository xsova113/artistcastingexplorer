import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Credit, TalentProfile } from "@prisma/client";
import CreditFormDialog from "./CreditFormDialog";
import Stack from "@/components/Stack";

interface CreditAccordianProps {
  data: Credit;
  talent: TalentProfile;
}

const CreditAccordian = ({ data, talent }: CreditAccordianProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={data.id}
        className="rounded border-b-0 border-l-2 border-primary bg-secondary px-4"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="mr-8 flex w-full items-baseline justify-between">
            <span className="font-semibold">{data.productionTitle}</span>
            <span className="text-sm text-muted-foreground">
              {data.yearOfRelease}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Stack className="gap-y-2 text-muted-foreground">
            <p>
              <span className="font-semibold text-black">Category:</span>{" "}
              {data.category}
            </p>
            <p>
              <span className="font-semibold text-black">Role:</span>{" "}
              {data.role}
            </p>
            <p>
              <span className="font-semibold text-black">
                Number of Episode:
              </span>{" "}
              {data.numberOfEpisode}
            </p>
            <CreditFormDialog talent={talent} initialData={data}>
              <span>Edit</span>
            </CreditFormDialog>
          </Stack>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CreditAccordian;
