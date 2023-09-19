import Stack from "@/components/Stack";
import ServiceCard from "./ServiceCard";
import FlexBetween from "@/components/FlexBetween";
import { Camera, ChefHat, Heart, Speaker } from "lucide-react";

const ServiceSection = () => {
  return (
    <Stack className="mx-auto mt-24 flex flex-col items-center gap-16 lg:max-w-screen-lg">
      <h1 className="text-3xl font-semibold lg:text-4xl">Our Services</h1>
      <div className="grid grid-cols-1 max-md:gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        <ServiceCard
          Icon={ChefHat}
          description="Sit veniam Lorem ea sit ad enim sit aliquip aute do ad."
          title="Feature 1"
        />
        <ServiceCard
          Icon={Camera}
          description="Aliqua laboris et quis Lorem est incididunt dolore Lorem minim."
          title="Feature 2"
        />
        <ServiceCard
          Icon={Heart}
          description="Dolor consectetur culpa dolore eiusmod fugiat sunt excepteur do."
          title="Feature 3"
        />
        <ServiceCard
          Icon={Speaker}
          description="Aute mollit labore excepteur anim consequat amet aute sint ut labore."
          title="Feature 4"
        />
      </div>
    </Stack>
  );
};

export default ServiceSection;
