"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

export const onLike = async ({
  talentId,
  likesArray,
}: {
  talentId: string;
  likesArray: string[];
}) => {
  try {
    const updatedPost = await prisma.talentProfile.update({
      where: { id: talentId },
      data: {
        likes: likesArray,
      },
    });

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const getLikes = async ({ talentId }: { talentId: string }) => {
  try {
    const likes = await prisma.talentProfile.findUnique({
      where: { id: talentId },
      select: {
        likes: true,
      },
    });

    if (!likes) throw Error;

    return likes.likes;
  } catch (error) {
    console.log(error);
  }
};

export const removeLike = async ({ talentId }: { talentId: string }) => {
  try {
    const user = await currentUser();
    if (!user) throw Error("Unauthorized");

    const likes = await getLikes({ talentId });

    const updatedPost = await prisma.talentProfile.update({
      where: { id: talentId },
      data: {
        likes: likes?.filter((id) => id !== user.id),
      },
    });

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};
