import Stack from "@/components/Stack";
import FeatureCard from "./FeatureCard";
import { Camera, ChefHat, Heart } from "lucide-react";

const ServiceSection = () => {
  return (
    <Stack className="mx-auto mt-24 flex w-full flex-col items-center gap-16 lg:max-w-screen-lg">
      <h1 className="text-2xl font-semibold lg:text-4xl">Our Features</h1>
      <div className="grid-cols-1 md:grid-cols-3 grid justify-between gap-y-14">
        <FeatureCard
          Icon={ChefHat}
          description="This platform features information about artists excelling in a wide range of fields. Ideal resources tailored to your project can be found here to match your specific requirements"
          title="For Casting Directors"
        />
        <FeatureCard
          Icon={Camera}
          description="Engage with Casting Directors and collabolaters.
          You can share news, upcoming exhibitions, and events, keeping casting directors and fans engaged and informed."
          title="For Artists"
        />
        <FeatureCard
          Icon={Heart}
          description="You can use this platform to find artists and scout individuals who possess exceptional skills and potential."
          title="For Talent Agencies"
        />
      </div>
    </Stack>
  );
};

export default ServiceSection;
