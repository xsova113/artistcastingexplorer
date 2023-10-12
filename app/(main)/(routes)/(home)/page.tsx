import DiscoverSection from "./components/DiscoverSection";
import HeroSection from "./components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import ServiceSection from "./components/FeatureSection";
import { getTalents } from "@/actions/getTalents";

export default async function Home() {
  const talents = await getTalents();

  return (
    <main>
      <HeroSection />
      <ServiceSection />
      <DiscoverSection talents={talents} />
      <div className="mx-4 md:mx-20">
        <NewsletterSection />
      </div>
    </main>
  );
}
