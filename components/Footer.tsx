import { Facebook, Instagram, Youtube } from "lucide-react";
import FlexBetween from "./FlexBetween";
import Logo from "./Logo";
import Stack from "./Stack";
import Link from "next/link";
import { Separator } from "./ui/separator";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <Stack className="items-center shadow bg-slate-50">
      <FlexBetween className="pt-10 px-10 max-md:flex-col space-y-10 max-md:text-center md:items-start">
        <Stack className="md:w-1/5 gap-6 max-md:items-center">
          <Logo />
          <p className="text-muted-foreground text-sm">
            Summarize your business so the visitor can learn about your
            offerings from any page on your website.
          </p>
          <div className="flex gap-4 max-md:justify-center">
            <Link href={"#"}>
              <Facebook className="hover:-translate-y-1 transition" />
            </Link>
            <Link href={"#"}>
              <Instagram className="hover:-translate-y-1 transition" />
            </Link>
            <Link href={"#"}>
              <Youtube className="hover:-translate-y-1 transition" />
            </Link>
          </div>
        </Stack>
        <Stack className="gap-2 text-muted-foreground text-sm">
          <h2 className="mb-2 font-semibold text-lg text-primary">
            Quick Links
          </h2>
          <Link href={"/news"}>News</Link>
          <Link href={"/directory"}>Directory</Link>
          <Link href={"/interviews"}>Interviews</Link>
          <Link href={"#"}>Privacy Policy</Link>
        </Stack>
        <Stack className="gap-2 text-muted-foreground text-sm">
          <h2 className="mb-2 font-semibold text-lg text-primary">
            Quick Links
          </h2>
          <Link href={"/news"}>News</Link>
          <Link href={"/directory"}>Directory</Link>
          <Link href={"/interviews"}>Interviews</Link>
          <Link href={"#"}>Privacy Policy</Link>
        </Stack>
        <Stack className="gap-2 text-muted-foreground text-sm">
          <h2 className="mb-2 font-semibold text-lg text-primary">
            Quick Links
          </h2>
          <Link href={"/news"}>News</Link>
          <Link href={"/directory"}>Directory</Link>
          <Link href={"/interviews"}>Interviews</Link>
          <Link href={"#"}>Privacy Policy</Link>
        </Stack>
      </FlexBetween>
      <Separator className="mt-8 mb-2 w-[80%] flex" />
      <span className="text-sm text-muted-foreground pb-2">
        Casting Japanese © {currentYear} Copyright
      </span>
    </Stack>
  );
};

export default Footer;
