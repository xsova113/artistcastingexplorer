import DiscoverSection from "./_components/DiscoverSection";
import HeroSection from "./_components/HeroSection";
import ServiceSection from "./_components/FeatureSection";
import { getTalents } from "@/actions/getTalents";
import NewSection from "./_components/NewSection";
import InterviewSection from "./_components/InterviewSection";

const HomePage = async () => {
  const talents = await getTalents();

  return (
    <main>
      <HeroSection />
      <ServiceSection />
      <DiscoverSection talents={talents} />
      <NewSection />
      <InterviewSection />
    </main>
  );
};

export default HomePage;
