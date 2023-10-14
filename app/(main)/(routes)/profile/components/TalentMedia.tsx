"use client";

import Stack from "@/components/Stack";
import { useLightBoxStore } from "@/hooks/useLightBoxStore";
import Image from "next/image";
import MediaLightBox from "./MediaLightBox";
import { Play, PlayCircle } from "lucide-react";

interface TalentMediaProps {
  images: string[];
  videos: string[];
}

const TalentMedia = ({ images, videos }: TalentMediaProps) => {
  const { onOpen, setMedia } = useLightBoxStore();

  return (
    <Stack className="w-full rounded-lg p-2 md:w-[55%] ">
      <h1 className="mb-6 text-2xl font-semibold">Media</h1>
      <div className="relative h-[400px] w-full overflow-hidden rounded">
        <Image
          src={
            images[0]
          }
          alt={"Main talent image"}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image}
            className="relative mt-4 h-20 w-20 cursor-pointer overflow-hidden rounded-md transition hover:opacity-70"
            onClick={() => {
              setMedia(image);
              onOpen();
            }}
          >
            <Image
              src={image}
              alt={"Image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}

        {videos.map((video) => (
          <div
            key={video}
            className="relative mt-4 h-20 w-20 cursor-pointer overflow-hidden rounded-md transition hover:opacity-70"
            onClick={() => {
              setMedia(video);
              onOpen();
            }}
          >
            <PlayCircle
              strokeWidth={1}
              className="absolute right-1/3 top-1/3 fill-white/30"
            />
            <video src={video} />
          </div>
        ))}
      </div>
      <MediaLightBox />
    </Stack>
  );
};

export default TalentMedia;
