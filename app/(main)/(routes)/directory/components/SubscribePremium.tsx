"use client";

import { buttonVariants } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "react-scroll-parallax";

const SubscribePremium = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 640px)");
  return (
    <section className="relative">
      <Parallax
        speed={isAboveMediumScreen ? -15 : -6}
        className="relative w-full h-[470px] -z-10"
      >
        <Image
          src={
            "https://castingjapanese.ca/wp-content/uploads/2023/09/banner-03.jpg"
          }
          alt={"subscription premium image"}
          fill
          className="object-cover opacity-80"
        />
        <div className="bg-slate-800 w-full h-full" />
      </Parallax>
      <div className="absolute top-1/3 flex flex-col text-center items-center w-full gap-8">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl text-white font-semibold"
        >
          Subscribe for premium feature
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/80"
        >
          Nulla voluptate quis do dolor nulla mollit sunt tempor.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href={"/subscribe"}
            className={cn(
              buttonVariants(),
              "uppercase rounded-full font-semibold px-6 bg-white text-slate-800 hover:bg-white/80"
            )}
          >
            Subscribe
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscribePremium;
