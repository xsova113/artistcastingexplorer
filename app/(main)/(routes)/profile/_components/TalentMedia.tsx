"use client";

import Stack from "@/components/Stack";
import { useLightBoxStore } from "@/hooks/useLightBoxStore";
import Image from "next/image";
import MediaLightBox from "./MediaLightBox";
import { Play } from "lucide-react";

interface TalentMediaProps {
  images: string[];
  videos: string[];
}

const TalentMedia = ({ images, videos }: TalentMediaProps) => {
  const { onOpen, setMedia } = useLightBoxStore();

  return (
    <Stack className="w-full rounded-lg p-2 md:w-[60%]">
      <h1 className="mb-6 text-2xl font-semibold">Media</h1>
      <div className="relative h-[400px] w-full overflow-hidden rounded">
        <Image
          src={images[0]}
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
      </div>
      {videos.length > 0 && (
        <Stack className="mt-6">
          <h1 className="text-lg font-semibold">Videos</h1>
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-4">
            {videos.map((video) => (
              <div key={video}>
                <div
                  className="relative mt-4 h-20 w-20 cursor-pointer overflow-hidden rounded-md transition hover:opacity-70"
                  onClick={() => {
                    setMedia(video);
                    onOpen();
                  }}
                >
                  <Play className="absolute right-1/3 top-1/3 fill-white/70 text-transparent" />
                  <video src={video} />
                </div>
              </div>
            ))}
          </div>
        </Stack>
      )}

      <MediaLightBox />
    </Stack>
  );
};

export default TalentMedia;
