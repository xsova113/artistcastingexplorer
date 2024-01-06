"use client";

import HeroSection from "@/components/HeroSection";
import SubscribePremium from "./_components/SubscribePremium";
import { getApprovedTalents } from "@/actions/getTalents";
import FilterAccordian from "./_components/FilterAccordian";
import Stack from "@/components/Stack";
import { useSortStore } from "@/hooks/useSortStore";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useQuery } from "react-query";
import { useState } from "react";
import { City, GenderType, Province, Role } from "@prisma/client";
import dynamic from "next/dynamic";

const TalentSection = dynamic(() => import("./_components/TalentSection"));

const DirectoryPage = () => {
  const searchParams = useSearchParams();
  const { orderBy } = useSortStore();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: allTalents } = useQuery({
    queryFn: () => getApprovedTalents({}),
  });

  const { data: talents, isLoading } = useQuery({
    queryKey: [
      "talents",
      currentPage,
      orderBy,
      searchParams.get("name"),
      searchParams.get("gender"),
      searchParams.get("ageMin"),
      searchParams.get("ageMax"),
      searchParams.get("heightMin"),
      searchParams.get("heightMax"),
      searchParams.get("city"),
      searchParams.get("province"),
      searchParams.get("role"),
      searchParams.get("keyword"),
    ],
    queryFn: () =>
      getApprovedTalents({
        currentPage,
        itemsPerPage,
        name: searchParams.get("name")?.toString(),
        ageMax: Number(searchParams.get("ageMax")),
        ageMin: Number(searchParams.get("ageMin")),
        role: searchParams.get("role") as Role,
        city: searchParams.get("city") as City,
        province: searchParams.get("province") as Province,
        gender: searchParams.get("gender") as GenderType,
        heightMax: Number(searchParams.get("heightMax")) || undefined,
        heightMin: Number(searchParams.get("heightMin")) || undefined,
        keyword: searchParams.get("keyword") || undefined,
        orderBy,
      }),
    keepPreviousData: true,
  });

  return (
    <div className="flex flex-col">
      {/* <HeroSection
        image={
          "https://castingjapanese.ca/wp-content/uploads/2023/09/home-new-bg-free-img.jpg"
        }
        title={"Discover a wide range of Artists and Creators"}
        description="Your Ultimate Resource for Success!"
      /> */}

      <div className="gap-y-10 flex w-full flex-col bg-slate-800 py-36 text-center">
        <h1 className="mx-auto text-center text-3xl font-medium capitalize text-white sm:text-4xl md:w-3/4 md:text-6xl md:leading-snug">
          Discover a wide range of Artists and Creators
        </h1>
        <p className="w-2/3 self-center text-primary-foreground/80">
          Your Ultimate Resource for Success!
        </p>
      </div>
      <Stack className="mx-auto">
        <h1 className="mt-24 text-3xl font-semibold lg:text-4xl">Talents</h1>
        <div className="mx-auto mb-12 mt-8 w-full border-b-2 border-primary" />
      </Stack>
      <FilterAccordian />
      {isLoading ? (
        <span className="my-20 flex items-center justify-center gap-2 text-center text-lg">
          Loading <BeatLoader loading={isLoading} size={10} />
        </span>
      ) : talents?.length === 0 || !talents ? (
        <span className="my-20 gap-2 text-center text-lg">
          No talents found...
        </span>
      ) : (
        <TalentSection
          talentCount={allTalents?.length}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          talents={talents}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      <SubscribePremium />
    </div>
  );
};

export default DirectoryPage;
