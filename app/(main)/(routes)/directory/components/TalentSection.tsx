import Stack from "@/components/Stack";
import TalentCard from "./TalentCard";
import FilterAccordian from "./FilterAccordian";

const TalentSection = () => {
  return (
    <Stack className="items-center max-w-screen-xl mx-auto">
      <FilterAccordian />
      <h1 className="text-3xl lg:text-4xl font-semibold">Talents</h1>
      <div className="border-b-2 w-1/12 border-primary mt-8 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
      </div>
    </Stack>
  );
};

export default TalentSection;
