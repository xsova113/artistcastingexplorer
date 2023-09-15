"use client";

import Stack from "@/components/Stack";
import Link from "next/link";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

const HeroSection = () => {
  return (
    <ParallaxBanner className="w-full lg:h-[600px] h-[500px]">
      <ParallaxBannerLayer
        image="/hero.jpg"
        speed={-15}
        className="opacity-60"
      />
      <ParallaxBannerLayer className="flex items-center bg-cover w-full">
        <Stack className="w-full text-center text-white lg:mt-32 mt-20">
          <h1 className="text-white md:text-6xl text-4xl capitalize">
            find actors, models, entertainers
          </h1>
          <Link
            href={"/subscribe"}
            className="w-fit px-8 rounded-full self-center bg-primary hover:bg-secondary-foreground uppercase lg:my-14 my-8 py-2 transition"
          >
            Join Now
          </Link>
          <h2 className="text-primary-foreground/80 w-2/3 self-center">
            Discover Canada largest network for Japanese models, actors, and
            entertainers
          </h2>
        </Stack>
      </ParallaxBannerLayer>
      <div className="bg-gradient-to-t from-blue-800 to-pink-800 w-full h-full" />
    </ParallaxBanner>
  );
};

export default HeroSection;
