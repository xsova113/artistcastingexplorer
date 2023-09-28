"use client";

import HeroSection from "@/components/HeroSection";
import SeenOn from "./components/SeenOn";
import TalentSection from "./components/TalentSection";
import SubscribePremium from "./components/SubscribePremium";
import { getTalents } from "@/actions/getTalents";
import FilterAccordian from "./components/FilterAccordian";
import DIrectoryCards from "./components/DIrectoryCards";
import Stack from "@/components/Stack";
import SortForm from "./components/SortForm";
import { useSortStore } from "@/hooks/useSortStore";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { TalentProfileType } from "@/types/talentProfileType";
import { BeatLoader } from "react-spinners";

const DirectoryPage = () => {
  const searchParams = useSearchParams();
  const [talents, setTalents] = useState<TalentProfileType[]>();
  const [loading, setLoading] = useState(false);
  const { orderBy } = useSortStore();
  const fetchTalents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTalents();
      setTalents(response);
    } catch (error: any) {
      console.log("Error fetching: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTalents();
  }, [fetchTalents]);

  const approvedTalents = talents?.filter(
    (talent) => talent.isApproved === true,
  );

  const filteredTalents = !searchParams
    ? approvedTalents
    : approvedTalents
        ?.filter(
          (talent) =>
            (!searchParams.get("name")
              ? true
              : talent.lastName
                  .toLowerCase()
                  .replaceAll(" ", "")
                  .includes(
                    searchParams
                      .get("name")!
                      .toLowerCase()
                      .replaceAll("%20", ""),
                  ) ||
                talent.firstName
                  .toLowerCase()
                  .replaceAll(" ", "")
                  .includes(
                    searchParams
                      .get("name")!
                      .toLowerCase()
                      .replaceAll("%20", ""),
                  )) &&
            (!searchParams.get("ageMax") || !searchParams.get("ageMin")
              ? true
              : talent.ageMin <= Number(searchParams.get("ageMax")) &&
                talent.ageMin >= Number(searchParams.get("ageMin"))) &&
            (!searchParams.get("heightMax") || !searchParams.get("heightMin")
              ? true
              : Number(talent.height) < Number(searchParams.get("heightMax")) &&
                Number(talent.height) >
                  Number(searchParams.get("heightMin"))) &&
            (!searchParams.get("city")
              ? true
              : talent.location.city?.toLowerCase() ===
                searchParams.get("city")!.toLowerCase()) &&
            (!searchParams.get("role")
              ? true
              : talent.performerType.role === searchParams.get("role")) &&
            (!searchParams.get("gender")
              ? true
              : talent.gender.gender === searchParams.get("gender")) &&
            (!searchParams.get("keyword")
              ? true
              : talent.skills
                  .map((skill) => skill.skill?.toLowerCase())
                  .includes(searchParams.get("keyword")!.toLowerCase()) ||
                talent.location.city
                  ?.toLowerCase()
                  .includes(searchParams.get("keyword")!.toLowerCase()) ||
                talent.firstName
                  .toLowerCase()
                  .includes(searchParams.get("keyword")!.toLowerCase()) ||
                talent.performerType.role
                  .toLowerCase()
                  .includes(searchParams.get("keyword")!.toLowerCase()) ||
                talent.lastName
                  .toLowerCase()
                  .includes(searchParams.get("keyword")!.toLowerCase())),
        )
        .sort(
          orderBy === "name-a"
            ? (a, b) => a.firstName.localeCompare(b.firstName)
            : orderBy === "name-z"
            ? (a, b) => b.firstName.localeCompare(a.firstName)
            : () => {
                return 0;
              },
        );

  return (
    <div className="flex flex-col">
      <HeroSection
        image={
          "https://castingjapanese.ca/wp-content/uploads/2023/09/home-new-bg-free-img.jpg"
        }
        title={"Discover Top Japanese Talents"}
        description="Your Ultimate Resource for Hiring Success!"
      />
      <SeenOn />
      <DIrectoryCards />
      <Stack className="mx-auto">
        <h1 className="text-3xl font-semibold lg:text-4xl">Talents</h1>
        <div className="mx-auto mb-12 mt-8 w-full border-b-2 border-primary" />
      </Stack>
      <FilterAccordian />
      <SortForm />
      {loading ? (
        <span className="my-20 flex items-center justify-center gap-2 text-center text-lg">
          Loading <BeatLoader loading={loading} size={10} />
        </span>
      ) : filteredTalents?.length === 0 || !filteredTalents ? (
        <span className="my-20 gap-2 text-center text-lg">
          No talents found...
        </span>
      ) : (
        <TalentSection talents={filteredTalents} />
      )}

      <SubscribePremium />
    </div>
  );
};

export default DirectoryPage;
