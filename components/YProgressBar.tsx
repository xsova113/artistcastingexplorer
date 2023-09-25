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
      className="fixed inset-0 z-10 h-2 origin-left bg-primary"
      style={{ scaleX }}
    />
  );
};

export default YProgressBar;
