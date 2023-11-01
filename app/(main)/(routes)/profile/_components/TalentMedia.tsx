"use client";

import Stack from "@/components/Stack";
import { useLightBoxStore } from "@/hooks/useLightBoxStore";
import Image from "next/image";
import MediaLightBox from "./MediaLightBox";
import { Play, Plus } from "lucide-react";
import VideoFormDialog from "./VideoFormDialog";
import { TalentProfileType } from "@/types/talentProfileType";
import Link from "next/link";
import { compareAsc } from "date-fns";

interface TalentMediaProps {
  images: string[];
  // videos: string[];
  talent: TalentProfileType;
}

const TalentMedia = ({ images, talent }: TalentMediaProps) => {
  const { onOpen, setMedia } = useLightBoxStore();

  return (
    <Stack className="basis-full rounded-lg p-2 md:basis-[40%]">
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
      <div className="mt-4 w-full">
        <div className="grid grid-cols-2 items-center">
          <h1 className="text-lg font-semibold">Videos</h1>
          <VideoFormDialog talent={talent} className="ml-auto w-fit">
            <Plus size={16} className="mr-1" /> Add Video
          </VideoFormDialog>
        </div>

        <Stack className="mt-6">
          <div className="grid grid-cols-1 gap-2">
            {talent.videos
              .sort((a, b) =>
                compareAsc(new Date(a.createdAt), new Date(b.createdAt)),
              )
              .map((video) => (
                <div
                  key={video.url}
                  className="flex items-center rounded-md border-l-2 border-primary bg-primary-foreground p-2 transition hover:scale-105"
                >
                  <Link
                    href={video.url}
                    target="_blank"
                    className="w-full hover:cursor-pointer"
                  >
                    <span className="font-semibold">{video.name}</span>{" "}
                  </Link>
                  <VideoFormDialog
                    talent={talent}
                    initialData={video}
                    className="ml-auto"
                  >
                    <span>Edit</span>
                  </VideoFormDialog>
                </div>
              ))}
            {/* {videos.map((video) => (
              <div key={video}>
                <div
                  className="relative mt-4 h-20 w-20 cursor-pointer overflow-hidden rounded-md transition hover:opacity-70"
                  onClick={() => {
                    setMedia(video);
                    onOpen();
                  }}
                >
                  <Play className="absolute right-1/3 top-1/3 fill-white/70 text-transparent" />
                  <video src={video} className="bg-cover" />
                </div>
              </div>
            ))} */}
          </div>
        </Stack>
      </div>

      <MediaLightBox />
    </Stack>
  );
};

export default TalentMedia;
