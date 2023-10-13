import DiscoverSection from "./components/DiscoverSection";
import HeroSection from "./components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import ServiceSection from "./components/FeatureSection";
import { getTalents } from "@/actions/getTalents";
import NewSection from "./components/NewSection";
import InterviewSection from "./components/InterviewSection";

const HomePage = async () => {
  const talents = await getTalents();

  return (
    <main>
      <HeroSection />
      <ServiceSection />
      <DiscoverSection talents={talents} />
      <NewSection />
      <InterviewSection />
      <div className="mx-4 md:mx-20">
        <NewsletterSection />
      </div>
    </main>
  );
};

export default HomePage;
