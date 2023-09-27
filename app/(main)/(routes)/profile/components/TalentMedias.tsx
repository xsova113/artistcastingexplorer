"use client";

import Stack from "@/components/Stack";
import { useLightBoxStore } from "@/hooks/useLightBoxStore";
import Image from "next/image";
import MediaLightBox from "./MediaLightBox";

interface TalentMediasProps {
  medias: string[];
}

const TalentMedias = ({ medias }: TalentMediasProps) => {
  const { onOpen, setMedia } = useLightBoxStore();

  return (
    <Stack className="w-full md:w-[40%]">
      <h1 className="mb-4 text-2xl font-semibold">Medias</h1>
      <div className="relative h-[400px] w-full overflow-hidden rounded">
        <Image
          src={
            medias.filter(
              (image) => image.split(".").pop() === ("jpg" || "png" || "jpeg"),
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
            {media.split(".").pop() === ("jpg" || "jpeg" || "png") ? (
              <Image fill src={media} alt={media} className="object-cover" />
            ) : (
              <video src={media} className="rounded" />
            )}
          </div>
        ))}
      </div>
      <MediaLightBox />
    </Stack>
  );
};

export default TalentMedias;
