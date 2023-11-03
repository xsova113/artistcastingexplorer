"use client";

import EditorOutput from "@/components/EditorOutput";
import { Post } from "@prisma/client";

const PostOutput = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <EditorOutput key={post.id} content={post.content} />
      ))}
    </div>
  );
};

export default PostOutput;
