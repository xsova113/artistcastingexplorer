"use client";

import Stack from "@/components/Stack";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

const HeroSection = () => {
  const [X, setX] = useState(0);

  useEffect(() => {});

  return (
    <ParallaxBanner className="h-[500px] w-full lg:h-[600px]">
      <ParallaxBannerLayer
        image="/hero.jpg"
        speed={-15}
        className="opacity-60"
      />
      <ParallaxBannerLayer className="flex w-full items-center bg-cover">
        <Stack className="mt-20 w-full text-center text-white lg:mt-32">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="text-4xl capitalize text-white md:text-6xl"
          >
            find actors, models, entertainers
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="my-12"
          >
            <Link
              href={"/subscribe"}
              className="w-fit self-center rounded-full bg-primary px-8 py-2 uppercase transition hover:bg-secondary-foreground lg:my-14"
            >
              Join Now
            </Link>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-2/3 self-center text-primary-foreground/80"
          >
            Discover Canada largest network for Japanese models, actors, and
            entertainers
          </motion.h2>
        </Stack>
      </ParallaxBannerLayer>
      <div className="h-full w-full bg-gradient-to-t from-blue-800 to-pink-800" />
    </ParallaxBanner>
  );
};

export default HeroSection;
