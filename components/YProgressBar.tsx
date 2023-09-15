"use client";
import { motion, useScroll, useSpring } from "framer-motion";

const YProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-0 h-2 bg-primary origin-left z-10"
      style={{ scaleX }}
    />
  );
};

export default YProgressBar;
