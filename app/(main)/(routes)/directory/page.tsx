import HeroSection from "@/components/HeroSection";
import DirectoryCard from "./components/DirectoryCard";
import SeenOn from "./components/SeenOn";
import TalentSection from "./components/TalentSection";
import SubscribePremium from "./components/SubscribePremium";
import { getTalents } from "@/actions/getTalents";
import FilterAccordian from "./components/FilterAccordian";
import { Role } from "@prisma/client";
import { getAge } from "@/lib/utils";

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
            : talent.gender.gender === searchParams.gender),
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
      <div className="mx-8 mb-24 flex max-w-screen-xl flex-col gap-x-4 gap-y-4 self-center md:flex-row">
        <DirectoryCard
          image={
            "https://castingjapanese.ca/wp-content/uploads/2023/09/women-fashion-free-img.jpg"
          }
          title={"Top Actors"}
          description={
            "Consectetur ipsum ullamco esse reprehenderit cupidatat cillum laborum do occaecat aute cillum."
          }
        />
        <DirectoryCard
          image={
            "https://castingjapanese.ca/wp-content/uploads/2023/09/men-fashion-free-img.jpg"
          }
          title={"Hire Models"}
          description={
            "Consectetur non cupidatat reprehenderit velit ex labore labore aute."
          }
        />
        <DirectoryCard
          image={
            "https://castingjapanese.ca/wp-content/uploads/2023/09/carnival-lights-holiday-4092632.jpg"
          }
          title={"Dicover Entertainers"}
          description={
            "Fugiat veniam adipisicing laboris id qui velit labore et velit voluptate sit anim duis."
          }
        />
      </div>
      <FilterAccordian />
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
