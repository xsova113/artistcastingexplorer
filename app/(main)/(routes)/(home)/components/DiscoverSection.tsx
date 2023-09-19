"use client";

import Stack from "@/components/Stack";
import DiscoverCard from "./DiscoverCard";

const DiscoverSection = () => {
  return (
    <Stack className="gap-8 items-center my-28">
      <h1 className="lg:text-4xl text-3xl font-semibold">
        Discover Talents Now
      </h1>
      <p className="text-center">
        Quis qui non laboris amet culpa ipsum veniam aute enim laborum quis.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
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
    </Stack>
  );
};

export default DiscoverSection;
