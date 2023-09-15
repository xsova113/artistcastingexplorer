import HeroSection from "@/components/HeroSection";
import DirectoryCard from "./components/DirectoryCard";
import SeenOn from "./components/SeenOn";
import TalentCard from "./components/TalentCard";
import TalentSection from "./components/TalentSection";

const DirectoryPage = () => {
  return (
    <div className="mb-24">
      <HeroSection
        image={
          "https://castingjapanese.ca/wp-content/uploads/2023/09/home-new-bg-free-img.jpg"
        }
        title={"Discover Top Japanese Talents"}
        description="Your Ultimate Resource for Hiring Success!"
      />
      <SeenOn />
      <div className="flex flex-col mb-24 md:flex-row gap-x-4 gap-y-4 justify-center items-center max-w-screen-xl mx-8">
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
      <TalentSection />
    </div>
  );
};

export default DirectoryPage;
