import HeroSection from "./_components/HeroSection";
import ServiceSection from "./_components/FeatureSection";
import { getTalents } from "@/actions/getTalents";
import dynamic from "next/dynamic";

const DiscoverSection = dynamic(() => import("./_components/DiscoverSection"));
const NewSection = dynamic(() => import("./_components/NewSection"));
const InterviewSection = dynamic(
  () => import("./_components/InterviewSection"),
);
const TopNewsSection = dynamic(() => import("./_components/TopNewsSection"));

const HomePage = async () => {
  const talents = await getTalents();

  return (
    <main>
      <HeroSection />
      <ServiceSection />
      <DiscoverSection talents={talents} />
      <NewSection />
      <InterviewSection />
      <TopNewsSection />
    </main>
  );
};

export default HomePage;
