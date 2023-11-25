"use server";

import prisma from "@/lib/client";

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

    return likes;
  } catch (error) {
    console.log(error);
  }
};
