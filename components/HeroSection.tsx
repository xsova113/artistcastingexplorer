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
    <ParallaxBanner className="w-full h-[500px]">
      <ParallaxBannerLayer
        image={image}
        scale={[0.8, 1.2]}
        className="opacity-80"
      />
      <ParallaxBannerLayer className="flex items-center bg-cover w-full">
        <Stack className="w-full text-center text-white gap-10">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="text-white md:text-6xl sm:text-4xl text-3xl capitalize"
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
            className="text-primary-foreground/80 w-2/3 self-center"
          >
            {description}
          </motion.p>
        </Stack>
      </ParallaxBannerLayer>

      <div className="bg-black w-full h-full" />
    </ParallaxBanner>
  );
};

export default HeroSection;
