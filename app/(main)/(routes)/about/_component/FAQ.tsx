import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start gap-y-4 px-2.5 pt-24 md:px-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold md:text-4xl">FAQ</h1>
        <p className="text-muted-foreground">
          Please be aware that Artist Casting Explorer operates independently
          from talent agencies or casting facilities. We{" "}
          <span className="underline">do not</span> impose any fees or
          commissions for accessing talent profiles or for talents to showcase
          their profiles on our platform.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Is there a requirement to sign up for a talent profile?
          </AccordionTrigger>
          <AccordionContent>Answer goes here...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need to pay to sign up as an artist?
          </AccordionTrigger>
          <AccordionContent>
            No. We are a non-profit organization and we do not charge any fee
            for user or artists to sign up. components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Another question</AccordionTrigger>
          <AccordionContent>Another answer.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
