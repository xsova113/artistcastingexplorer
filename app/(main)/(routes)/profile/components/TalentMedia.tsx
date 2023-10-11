"use client";

import Stack from "@/components/Stack";
import { useLightBoxStore } from "@/hooks/useLightBoxStore";
import Image from "next/image";
import MediaLightBox from "./MediaLightBox";

interface TalentMediaProps {
  medias: string[];
}

const TalentMedia = ({ medias }: TalentMediaProps) => {
  const { onOpen, setMedia } = useLightBoxStore();

  return (
    <Stack className="w-full rounded-lg p-2 md:w-[55%] ">
      <h1 className="mb-6 text-2xl font-semibold">Media</h1>
      <div className="relative h-[400px] w-full overflow-hidden rounded">
        <Image
          src={
            medias.filter(
              (image) =>
                image.split(".").pop() === "jpg" ||
                image.split(".").pop() === "png" ||
                image.split(".").pop() === "jpeg",
            )[0]
          }
          alt={"Main talent image"}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-4">
        {medias.map((media) => (
          <div
            key={media}
            className="relative mt-4 h-20 w-20 cursor-pointer overflow-hidden rounded-md"
            onClick={() => {
              setMedia(media);
              onOpen();
            }}
          >
            {media.split(".").pop() === "png" ? (
              <Image
                src={media}
                alt={"Image"}
                fill
                className="object-cover"
                priority
              />
            ) : media.split(".").pop() === "jpg" ? (
              <Image
                src={media}
                alt={"Image"}
                fill
                className="object-cover"
                priority
              />
            ) : media.split(".").pop() === "jpeg" ? (
              <Image
                src={media}
                alt={"Image"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <video src={media} className="rounded-lg object-cover" />
            )}
          </div>
        ))}
      </div>
      <MediaLightBox />
    </Stack>
  );
};

export default TalentMedia;
