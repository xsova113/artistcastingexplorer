"use server";

import { VideoFormValues } from "@/app/(main)/(routes)/profile/_components/VideoFormDialog";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

type createVideoValues = {
  values: VideoFormValues;
  talentId: string;
};

type updateVideoValues = {
  values: VideoFormValues;
  videoId: string;
};

type DeleteVideoValues = {
  id: string;
};

export const createVideo = async ({ values, talentId }: createVideoValues) => {
  const { userId } = auth();

  if (!userId) return console.log("User ID is missing.");
  if (!talentId) return console.log("talent ID is missing.");

  try {
    const video = await prisma.video.create({
      data: {
        name: values.videoName,
        url: values.videoUrl,
        talentProfileId: talentId,
      },
    });

    return video;
  } catch (error) {
    console.log("Failed to update video", error);
  }
};

export const updateVideo = async ({ values, videoId }: updateVideoValues) => {
  const { userId } = auth();

  if (!userId) return console.log("User ID is missing.");

  try {
    const video = await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        name: values.videoName,
        url: values.videoUrl,
      },
    });

    return video;
  } catch (error) {
    console.log("Failed to update video", error);
  }
};

export const deleteVideo = async ({ id }: DeleteVideoValues) => {
  const { userId } = auth();

  if (!userId) return console.log("User ID is missing.");

  try {
    const video = await prisma.video.delete({
      where: {
        id,
      },
    });

    return video;
  } catch (error) {
    console.log("Failed to delete video", error);
  }
};
