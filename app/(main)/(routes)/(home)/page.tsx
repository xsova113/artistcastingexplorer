import DiscoverSection from "./_components/DiscoverSection";
import HeroSection from "./_components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
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
      <div className="mx-4 md:mx-20">
        <NewsletterSection />
      </div>
    </main>
  );
};

export default HomePage;
