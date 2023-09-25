import HeroSection from "@/components/HeroSection";
import DirectoryCard from "./components/DirectoryCard";
import SeenOn from "./components/SeenOn";
import TalentSection from "./components/TalentSection";
import SubscribePremium from "./components/SubscribePremium";
import { getTalents } from "@/actions/getTalents";
import FilterAccordian from "./components/FilterAccordian";
import { Role } from "@prisma/client";
import { getAge } from "@/lib/utils";
import DIrectoryCards from "./components/DIrectoryCards";
import Stack from "@/components/Stack";
import SortForm from "./components/SortForm";

interface DirectoryPageProps {
  searchParams: {
    name: string;
    gender: string;
    ageMin: number;
    ageMax: number;
    city: string;
    province: string;
    role: Role;
    heightMin: number;
    heightMax: number;
    keyword: string;
  };
}

const DirectoryPage = async ({ searchParams }: DirectoryPageProps) => {
  const talents = await getTalents();
  const approvedTalents = talents?.filter(
    (talent) => talent.isApproved === true,
  );

  const filteredTalents = !searchParams
    ? approvedTalents
    : approvedTalents?.filter(
        (talent) =>
          (!searchParams.name
            ? true
            : talent.lastName
                .toLowerCase()
                .replaceAll(" ", "")
                .includes(
                  searchParams.name.toLowerCase().replaceAll("%20", ""),
                ) ||
              talent.firstName
                .toLowerCase()
                .replaceAll(" ", "")
                .includes(
                  searchParams.name.toLowerCase().replaceAll("%20", ""),
                )) &&
          (!searchParams.ageMax || !searchParams.ageMin
            ? true
            : getAge(talent.dob.toString()) < searchParams.ageMax &&
              getAge(talent.dob.toString()) > searchParams.ageMin) &&
          (!searchParams.heightMax || !searchParams.heightMin
            ? true
            : Number(talent.height) < searchParams.heightMax &&
              Number(talent.height) > searchParams.heightMin) &&
          (!searchParams.city
            ? true
            : talent.location.city?.toLowerCase() ===
              searchParams.city.toLowerCase()) &&
          (!searchParams.role
            ? true
            : talent.performerType.role === searchParams.role) &&
          (!searchParams.gender
            ? true
            : talent.gender.gender === searchParams.gender) &&
          (!searchParams.keyword
            ? true
            : talent.skills
                .map((skill) => skill.skill?.toLowerCase())
                .includes(searchParams.keyword.toLowerCase()) ||
              talent.location.city
                ?.toLowerCase()
                .includes(searchParams.keyword.toLowerCase()) ||
              talent.firstName
                .toLowerCase()
                .includes(searchParams.keyword.toLowerCase()) ||
              talent.performerType.role
                .toLowerCase()
                .includes(searchParams.keyword.toLowerCase()) ||
              talent.lastName
                .toLowerCase()
                .includes(searchParams.keyword.toLowerCase())),
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
      {filteredTalents?.length === 0 || !filteredTalents ? (
        <span className="my-20 text-center text-lg">No talents found...</span>
      ) : (
        <TalentSection talents={filteredTalents} />
      )}

      <SubscribePremium />
    </div>
  );
};

export default DirectoryPage;
