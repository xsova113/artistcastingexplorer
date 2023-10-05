import DiscoverSection from "./components/DiscoverSection";
import HeroSection from "./components/HeroSection";
import NewsletterSection from "./components/NewsletterSection";
import ServiceSection from "./components/ServiceSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServiceSection />
      <DiscoverSection />
      <NewsletterSection />
    </main>
  );
}
