import { Contact, Newspaper, Pyramid } from "lucide-react";
import PerkItem from "./PerkItem";

const perks = [
  {
    icon: Newspaper,
    title: "Newsletter",
    description:
      "FREE SIGN UP for the weekly newsletter, which features the latest activity news and interviews with talents registered on this website.",
  },
  {
    icon: Pyramid,
    title: "Paid Premium Features",
    description:
      "We provide a range of premium features designed to enhance our users' experience and efficiency on this website.",
  },
  {
    icon: Contact,
    title: "Contact Artist Casting Explorer",
    description:
      "For general inquiries or information email us at info@artistcastingexplorer.com",
  },
];

const Perks = () => {
  return (
    <section className="mx-auto flex w-full max-w-screen-xl px-20 flex-col gap-y-10 pt-24">
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
