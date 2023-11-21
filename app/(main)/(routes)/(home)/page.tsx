import HeroSection from "./_components/HeroSection";
import ServiceSection from "./_components/FeatureSection";
import { getTalents } from "@/actions/getTalents";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const DiscoverSection = dynamic(() => import("./_components/DiscoverSection"), {
  loading: () => <Loading />,
});
const NewSection = dynamic(() => import("./_components/NewSection"), {
  loading: () => <Loading />,
});
const InterviewSection = dynamic(
  () => import("./_components/InterviewSection"),
  { loading: () => <Loading /> },
);

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
