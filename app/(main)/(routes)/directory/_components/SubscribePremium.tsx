"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SubscribePremium = () => {
  return (
    <section className="relative">
      <div className="relative -z-10 h-[470px] w-full">
        <Image
          src={
            "https://castingjapanese.ca/wp-content/uploads/2023/09/banner-03.jpg"
          }
          alt={"subscription premium image"}
          fill
          className="object-cover opacity-80"
        />
        <div className="h-full w-full bg-slate-800" />
      </div>
      <div className="absolute top-1/3 flex w-full flex-col items-center gap-8 text-center">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-white md:text-5xl"
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
          We provide a range of premium features designed to enhance our
          users&apos; experience and efficiency on this website.
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
              "rounded-full bg-white px-6 font-semibold uppercase text-slate-800 hover:bg-white/80",
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
