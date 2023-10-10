// @ts-nocheck

"use client";

import Stack from "@/components/Stack";
import DiscoverCard from "./DiscoverCard";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const DiscoverSection = () => {

  return (
    <Stack className="mx-2.5 my-28 w-full items-center gap-8">
      <h1 className="text-3xl font-semibold capitalize lg:text-4xl">
        Discover the best{" "}
        <span className="bg-gradient-to-r from-blue-500 via-violet-400 to-primary bg-clip-text text-transparent">
          talent
        </span>
      </h1>
      <p className="text-center">
        Quis qui non laboris amet culpa ipsum veniam aute enim laborum quis.
      </p>

      <div className="flex flex-col gap-4 lg:flex-row">
        <DiscoverCard
          description="Fugiat Lorem nisi cillum mollit ipsum eu officia duis enim esse tempor."
          image="/hero.jpg"
          title="Models"
        />
        <DiscoverCard
          description="Fugiat Lorem nisi cillum mollit ipsum eu officia duis enim esse tempor."
          image="/hero.jpg"
          title="Actors"
        />
        <DiscoverCard
          description="Fugiat Lorem nisi cillum mollit ipsum eu officia duis enim esse tempor."
          image="/hero.jpg"
          title="Entertainers"
        />
      </div>
      <Link
        href="/directory"
        className={buttonVariants({
          className:
            "bg-secondary-foreground px-8 hover:bg-secondary-foreground/80",
        })}
      >
        View All
      </Link>
    </Stack>
  );
};

export default DiscoverSection;
