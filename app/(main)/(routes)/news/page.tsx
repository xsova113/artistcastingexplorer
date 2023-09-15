"use client";

import { Post } from "@/types/post";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Category } from "@/types/category";
import { useRouter } from "next/navigation";

const NewsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/categories"
      );

      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const newsCategory = categories.find((category) => category.slug === "news");
  const filteredPosts = posts.filter(
    (post) => post.categories[0] === newsCategory?.id
  );

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  return (
    <div className="py-20 px-10">
      {isLoading && (
        <div className="w-full flex justify-center items-center text-2xl gap-4">
          Loading...
          <Loader2 className="animate-spin" size={50} />
        </div>
      )}

      {filteredPosts.map((post) => (
        <div
          key={post.id}
          onClick={() => router.push(`/news/${post.id}`)}
          className="cursor-pointer"
        >
          <h1>{post.title.rendered}</h1>
          <p>{post.uagb_author_info.display_name}</p>
          <Image
            alt="Author image"
            src={post.uagb_featured_image_src.full[0]}
            width={100}
            height={100}
          />
          <p>{dayjs(post.date).format("YYYY-MM-DD")}</p>
          <p>{post.uagb_excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
