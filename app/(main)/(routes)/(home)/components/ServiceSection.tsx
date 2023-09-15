import Stack from "@/components/Stack";
import ServiceCard from "./ServiceCard";
import FlexBetween from "@/components/FlexBetween";
import { Camera, ChefHat, Heart, Speaker } from "lucide-react";

const ServiceSection = () => {
  return (
    <Stack className="lg:max-w-screen-lg mx-auto mt-24 gap-16 flex flex-col items-center">
      <h1 className="font-semibold lg:text-4xl text-3xl">Our Services</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
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
