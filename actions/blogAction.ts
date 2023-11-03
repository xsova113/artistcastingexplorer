"use server";

import prisma from "@/lib/client";
import { PostCreationRequest } from "@/lib/validators/post";
import { auth } from "@clerk/nextjs";

export const createBlog = async ({
  data,
  content,
}: {
  data: PostCreationRequest;
  content?: any;
}) => {
  const { orgRole, userId } = auth();

  if (orgRole !== "admin") throw new Error("You are not authorized to create");
  if (!userId) throw new Error("No user ID found");

  const post = await prisma.post.create({
    data: {
      userId,
      title: data.title,
      content,
    },
  });

  return post;
};
