import { Facebook, Instagram, Youtube } from "lucide-react";
import FlexBetween from "./FlexBetween";
import Logo from "./Logo";
import Stack from "./Stack";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { FaXTwitter } from "react-icons/fa6";
import FooterNewsletter from "./FooterNewsletter";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <Stack className="items-center bg-slate-50 shadow">
      <FlexBetween className="space-y-10 px-10 pt-10 max-md:flex-col max-md:text-center md:items-start">
        <Stack className="gap-6 max-md:items-center md:w-1/3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Artist Casting Explorer is dedicated to enhancing the success of
            Hollywood North by uniting talented individuals with creators who
            craft entertainment that honors and pushes the boundaries of their
            cultures.
          </p>
          <div className="flex gap-4 max-md:justify-center">
            <Link href={"#"}>
              <Facebook className="transition hover:-translate-y-1" />
            </Link>
            <Link href={"#"}>
              <Instagram className="transition hover:-translate-y-1" />
            </Link>
            <Link href={"#"}>
              <Youtube className="transition hover:-translate-y-1" />
            </Link>
            <Link href={"#"}>
              <FaXTwitter
                size={21}
                className="transition hover:-translate-y-1"
              />
            </Link>
          </div>
        </Stack>
        <Stack className="gap-2 text-sm text-muted-foreground">
          <h2 className="mb-2 text-lg font-semibold text-primary">
            Quick Links
          </h2>
          <Link href={"/news"}>News</Link>
          <Link href={"/directory"}>Directory</Link>
          <Link href={"/interviews"}>Interviews</Link>
          <Link href={"/contact"}>Contact</Link>
        </Stack>
        <Stack className="gap-2 text-sm text-muted-foreground">
          <h2 className="mb-2 text-lg font-semibold text-primary">
            Quick Links
          </h2>
          <Link href={"/about"}>About</Link>
          <Link href={"/subscribe"}>Subscribe</Link>
          <Link
            href={
              "https://docs.google.com/document/d/e/2PACX-1vSdMRBGYn4U8U2-j3TA6dWREBlz0-VwUDyfqnxsrf3cJf1grcDhfR-scdMV9NfWCsZMHz9fcCEjC3p7/pub?embedded=true"
            }
          >
            Terms & Conditions
          </Link>
          <Link
            href={
              "https://docs.google.com/document/d/e/2PACX-1vTtACSPl3mWUFyyI2CJMqAoSd0HD7WyF_zwksYZeOsMWVsrSrNYZQwgLYU67s10rGBSPeUC5yN_Hu5p/pub?embedded=true"
            }
          >
            Privacy Policy
          </Link>
        </Stack>
        <FooterNewsletter />
      </FlexBetween>
      <Separator className="mb-2 mt-8 flex w-[80%]" />
      <span className="pb-2 text-sm text-muted-foreground">
        Artist Casting Explorer © {currentYear} Copyright
      </span>
    </Stack>
  );
};

export default Footer;
