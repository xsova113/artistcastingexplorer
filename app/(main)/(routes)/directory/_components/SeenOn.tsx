// @ts-nocheck

"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Slider from "react-slick";

const SeenOn = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 640px)");

  return (
    <div className="py-16">
      <Slider
        arrows={false}
        infinite
        autoplay
        autoplaySpeed={2000}
        slidesToScroll={1}
        slidesToShow={isAboveMediumScreens ? 4 : 2}
      >
        <div className="relative h-[25px] w-full">
          <Image
            src={
              "https://castingjapanese.ca/wp-content/uploads/2023/09/client-logo-5.png"
            }
            alt={"image"}
            fill
            className="object-contain"
          />
        </div>
        <div className="relative h-[25px] w-full">
          <Image
            src={
              "https://castingjapanese.ca/wp-content/uploads/2023/09/client-logo-1.png"
            }
            alt={"image"}
            fill
            className="object-contain"
          />
        </div>
        <div className="relative h-[25px] w-full">
          <Image
            src={
              "https://castingjapanese.ca/wp-content/uploads/2023/09/client-logo-2.png"
            }
            alt={"image"}
            fill
            className="object-contain"
          />
        </div>
        <div className="relative h-[25px] w-full">
          <Image
            src={
              "https://castingjapanese.ca/wp-content/uploads/2023/09/client-logo-4.png"
            }
            alt={"image"}
            fill
            className="object-contain"
          />
        </div>
        <div className="relative h-[25px] w-full">
          <Image
            src={
              "https://castingjapanese.ca/wp-content/uploads/2023/09/client-logo-2.png"
            }
            alt={"image"}
            fill
            className="object-contain"
          />
        </div>
      </Slider>
    </div>
  );
};

export default SeenOn;
