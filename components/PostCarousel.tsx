"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import PostCard from "./PostCard";
import { ElementRef, useEffect, useRef, useState } from "react";
import { Post } from "@/types/post";
import axios from "axios";
import { Category, Slug } from "@/types/category";
import { cn } from "@/lib/utils";

const PostCarousel = ({ categorySlug }: { categorySlug: Slug }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const ref = useRef<ElementRef<"div">>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/posts",
      );

      setPosts(response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/categories",
      );

      setCategories(response.data);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.categories.includes(
      (
        categories.find((category) => category.slug === categorySlug) ||
        categories[0]
      )?.id,
    ),
  );

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <section className="my-20 flex w-full flex-col">
      <h1 className="mb-10 self-center text-3xl font-semibold md:text-4xl">
        Related Articles
      </h1>

      {filteredPosts.length < 1 ? (
        <div className="mx-auto my-20 text-lg font-medium">
          {isLoading ? "Loading..." : "No related posts..."}
        </div>
      ) : (
        <div className="relative px-8">
          <ChevronLeft
            className={cn("absolute left-0 top-1/2 hover:cursor-pointer")}
            onClick={() =>
              ref.current?.scrollBy({ left: -150, behavior: "smooth" })
            }
          />
          <div
            ref={ref}
            className=" flex flex-col gap-x-6 overflow-x-scroll md:flex-row"
          >
            {filteredPosts.map((post) => (
              <PostCard
                authorId={post.author}
                content={post.excerpt.rendered}
                date={post.date}
                title={post.title.rendered}
                featuredImage={post.yoast_head_json.og_image[0].url}
                key={post.id}
                postId={post.id}
              />
            ))}
          </div>
          <ChevronRight
            className={cn("absolute right-0 top-1/2 hover:cursor-pointer")}
            onClick={() =>
              ref.current?.scrollBy({ left: 150, behavior: "smooth" })
            }
          />
        </div>
      )}
    </section>
  );
};

export default PostCarousel;
