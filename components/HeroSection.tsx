"use client";

import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import Stack from "./Stack";
import { motion } from "framer-motion";

interface HeroSectionProps {
  image: string;
  title: string;
  description?: string;
}

const HeroSection = ({ image, title, description }: HeroSectionProps) => {
  return (
    <ParallaxBanner className="h-[500px] w-full">
      <ParallaxBannerLayer
        image={image}
        scale={[0.8, 1.2]}
        className="opacity-80"
      />
      <ParallaxBannerLayer className="flex w-full items-center bg-cover">
        <Stack className="w-full gap-10 text-center text-white">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="mx-auto text-3xl font-medium capitalize text-white sm:text-4xl md:w-3/4 md:text-6xl md:leading-snug"
          >
            {title}
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-2/3 self-center text-primary-foreground/80"
          >
            {description}
          </motion.p>
        </Stack>
      </ParallaxBannerLayer>

      <div className="h-full w-full bg-black" />
    </ParallaxBanner>
  );
};

export default HeroSection;
