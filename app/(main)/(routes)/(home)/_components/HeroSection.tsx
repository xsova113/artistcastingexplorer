"use client";

import Stack from "@/components/Stack";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

const HeroSection = () => {
  const { isSignedIn } = useAuth();

  return (
    <ParallaxBanner className="h-[500px] w-full lg:h-[600px]">
      <ParallaxBannerLayer
        image="/hero.jpg"
        speed={-15}
        className="opacity-50"
      />
      <ParallaxBannerLayer className="flex w-full items-center bg-cover">
        <Stack className="mt-20 w-full text-center text-white lg:mt-32">
          <motion.h1
            data-cy="hero-text"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="self-center text-3xl tracking-wider text-white md:w-4/5 md:text-5xl"
          >
            Discover and Connect with{" "}
            <span className="textGradient font-semibold">Artists</span> and{" "}
            <span className="textGradient font-semibold">Creators</span>
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
            {isSignedIn ? (
              <Link
                href="/subscribe"
                className="w-fit self-center rounded-full bg-primary px-8 py-2 uppercase transition hover:bg-secondary-foreground lg:my-14"
              >
                Join Now
              </Link>
            ) : (
              <SignUpButton mode="modal">
                <button className="w-fit self-center rounded-full bg-primary px-8 py-1.5 uppercase transition hover:bg-secondary-foreground lg:my-14">
                  Join Now
                </button>
              </SignUpButton>
            )}
            <Link
              href={"/contact"}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className:
                    "ml-4 cursor-pointer rounded-full bg-transparent px-10 uppercase text-white",
                }),
                "rounded-full",
              )}
            >
              Contact
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
            Artist Casting Explorer is a general information website dedicated
            to artists and creators geographically located in Canada and Japan
          </motion.h2>
        </Stack>
      </ParallaxBannerLayer>
      <div className="h-full w-full bg-gradient-to-t from-blue-800 to-pink-800" />
    </ParallaxBanner>
  );
};

export default HeroSection;
