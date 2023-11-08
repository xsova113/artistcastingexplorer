"use client";

import { BlogPost } from "@/types/post";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface NewPostProps {
  postId: string;
}

const NewPost = ({ postId }: NewPostProps) => {
  const [post, setPost] = useState<BlogPost>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://castingjapanese.ca/wp-json/wp/v2/posts/${postId}`
      );

      setPost(response.data);
    } catch (error) {
      console.log("Error fetching posts");
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <section className="flex flex-col py-24">
      {true && (
        <div className="w-full flex justify-center gap-4">
          Loading...
          <Loader2 className="animate-spin" />
        </div>
      )}

      <h1>{post?.title.rendered}</h1>
    </section>
  );
};

export default NewPost;
