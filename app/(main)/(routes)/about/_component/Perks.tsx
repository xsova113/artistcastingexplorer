import { Contact, Newspaper, Pyramid } from "lucide-react";
import PerkItem from "./PerkItem";

const perks = [
  {
    icon: Newspaper,
    title: "Newsletter",
    description: (
      <p className="w-full text-muted-foreground">
        <span className="font-semibold">FREE SIGN UP</span> for the weekly
        newsletter, which features the latest activity news and interviews with
        talents registered on this website.
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
