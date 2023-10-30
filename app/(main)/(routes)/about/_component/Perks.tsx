import { Contact, Newspaper, Pen, Pyramid } from "lucide-react";
import PerkItem from "./PerkItem";
import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

const perks = [
  {
    icon: Pen,
    title: "Sign Up",
    description: (
      <p className="w-full text-muted-foreground">
        FREE{" "}
        <SignUpButton mode="modal">
          <span className="cursor-pointer underline">SIGN-UP</span>
        </SignUpButton>{" "}
        to connect and collaborate with your favorite talents.
      </p>
    ),
  },
  {
    icon: Newspaper,
    title: "Newsletter",
    description: (
      <p className="w-full text-muted-foreground">
        <Link href={"/subscribe"} className="font-semibold underline">
          SUBSCRIBE
        </Link>{" "}
        for the newsletter, which features the latest activity news and
        interviews with talents registered on this website.
      </p>
    ),
  },
  {
    icon: Pyramid,
    title: "Paid Premium Features",
    description: (
      <p className="w-full text-muted-foreground">
        We provide a range of premium features designed to enhance our
        users&apos; experience and efficiency on this website.
      </p>
    ),
  },
  {
    icon: Contact,
    title: "Contact Artist Casting Explorer",
    description: (
      <p className="w-full text-muted-foreground">
        For general inquiries or information email us at
        info@artistcastingexplorer.com
      </p>
    ),
  },
];

const Perks = () => {
  return (
    <section className="mx-auto flex w-full max-w-screen-xl flex-col gap-y-10 px-20 pt-24">
      {perks.map(({ title, description, icon }) => (
        <PerkItem
          key={title}
          title={title}
          description={description}
          icon={icon}
        />
      ))}
    </section>
  );
};

export default Perks;
