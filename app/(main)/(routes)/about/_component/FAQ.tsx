import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

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

      <Accordion type="single" collapsible className="w-full text-start items-start">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Is there a requirement to sign up for a talent profile?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Please click{" "}
            <Link href={"/subscribe"} className="underline">
              here
            </Link>{" "}
            and get started.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need to pay to sign up as an artist?
          </AccordionTrigger>
          <AccordionContent>
            No, there are absolutely no charges for profile publication.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Is it permissible to repost information from this website on other
            websites?
          </AccordionTrigger>
          <AccordionContent>
            The profiles and event information featured here are sourced
            directly from the artists themselves. Please make sure to contact
            the individuals directly. For inquiries regarding the republication
            of interview articles, please reach out to this email address at{" "}
            <a
              href="mailto:info@artistcastingexplorer.com"
              className="text-blue-600"
            >
              info@artistcastingexplorer.com
            </a>
            .
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How can I unsubscribe?</AccordionTrigger>
          <AccordionContent>
            You can unsubscribe and manage your subscription in{" "}
            <Link href={"/settings"} className="underline">
              Settings
            </Link>{" "}
            page.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
