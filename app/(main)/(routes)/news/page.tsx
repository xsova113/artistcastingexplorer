"use client";

import { News } from "@/types/new";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const NewsPage = () => {
  const [posts, setPosts] = useState<News>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/posts"
      );

      setPosts(response.data);
    } catch (error) {
      console.log("Error fetching posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="py-10 px-10">
      {isLoading && (
        <div className="w-full flex justify-center gap-4">
          Loading...
          <Loader2 className="animate-spin" />
        </div>
      )}
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title.rendered}</h1>
          <p>{post.uagb_author_info.display_name}</p>
          <Image
            alt="Author image"
            src={post.uagb_featured_image_src.full[0]}
            width={100}
            height={100}
          />
          <p>{dayjs(post.date).format("YYYY-MM-DD")}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
