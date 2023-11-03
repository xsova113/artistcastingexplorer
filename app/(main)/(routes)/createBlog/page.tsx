import Editor from "@/components/Editor";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import React from "react";
import PostOutput from "./_components/PostOutput";

const createBlogPage = async () => {
  const { orgRole } = auth();

  if (orgRole !== "admin") notFound();

  const posts = await prisma.post.findMany();

  return (
    <div className="flex flex-col gap-y-20">
      <div className="p-8">
        <Editor />
      </div>
      <div>
        <PostOutput posts={posts} />
      </div>
    </div>
  );
};

export default createBlogPage;
