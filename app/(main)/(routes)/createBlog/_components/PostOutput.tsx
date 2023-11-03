"use client";

import EditorOutput from "@/components/EditorOutput";
import { Post } from "@prisma/client";

const PostOutput = ({ posts }: { posts: Post[] }) => {
  return <EditorOutput content={posts[5]?.content} />;
};

export default PostOutput;
