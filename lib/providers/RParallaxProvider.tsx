"use client";

import { ParallaxProvider } from "react-scroll-parallax";

const RParallaxProvider = ({ children }: { children: React.ReactNode }) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};

export default RParallaxProvider;
