"use client";

import HeroSection from "@/components/HeroSection";
import Articles from "../../../../components/Articles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Post } from "@/types/post";
import axios from "axios";
import Archive from "./components/Archive";
import {  Loader2 } from "lucide-react";
import { Category } from "@/types/category";

const NewsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/posts",
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

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/categories",
      );

      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories");
    }
  }, []);

  const newsCategory = categories.find((category) => category.slug === "news");

  useMemo(() => {
    const filteredPosts = posts.filter(
      (post) => post.categories[0] === newsCategory?.id,
    );
    setFilteredPosts(filteredPosts);
  }, [newsCategory?.id, posts, setFilteredPosts]);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCategories]);

  return (
    <section>
      <HeroSection
        image={"/heronews.jpg"}
        title={"News"}
        description="Explore here for details on artist appearances and more"
      />
      <div className="mx-auto grid max-w-screen-lg grid-cols-1 justify-center py-20 md:grid-cols-2">
        <div className="flex w-full flex-col md:ml-[40%]">
          <h1 className="mx-auto mb-10 text-3xl font-semibold">Recent News</h1>
          {isLoading && (
            <div className="flex w-full items-center justify-center gap-4 pb-8 text-2xl">
              <Loader2 className="animate-spin" size={50} />
            </div>
          )}
          {/* @ts-ignore */}
          <Articles
            filteredPosts={filteredPosts}
            path={"news"}
            isLoading={isLoading}
            posts={posts}
            setFilteredPosts={setFilteredPosts}
          />
        </div>

        <Archive posts={posts} setFilteredPosts={setFilteredPosts} />
      </div>
    </section>
  );
};

export default NewsPage;
