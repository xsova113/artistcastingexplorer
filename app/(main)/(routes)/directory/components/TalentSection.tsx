"use client";

import Stack from "@/components/Stack";
import TalentCard from "./TalentCard";
import FilterAccordian from "./FilterAccordian";
import InfiniteScroll from "react-infinite-scroll-component";

const TalentSection = () => {
  return (
    <Stack className="items-center bg-white w-full pb-24 mx-auto">
      <FilterAccordian />
      <h1 className="text-3xl lg:text-4xl font-semibold">Talents</h1>
      <div className="border-b-2 w-1/12 border-primary mt-8 mb-12" />

      <InfiniteScroll
        dataLength={8}
        next={() => {}}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-white"
      >
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
      </InfiniteScroll>
    </Stack>
  );
};

export default TalentSection;
