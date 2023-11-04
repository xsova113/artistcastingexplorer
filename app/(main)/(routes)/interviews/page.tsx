"use client";

import HeroSection from "@/components/HeroSection";
import Articles from "../../../../components/Articles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Post } from "@/types/post";
import { Category } from "@/types/category";
import axios from "axios";
import InterviewArchive from "../news/components/InterviewArchive";
import { Loader2 } from "lucide-react";

// TODO: Add categories / subcategories as Title type

type Title = "actors" | "model" | "singer" | "musician" | "interview";

const InterviewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Get all posts
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

  // Get all categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/categories",
      );

      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  // Get specific category
  const interviewCategory = useCallback(
    (categoryType: string) =>
      categories.find((category) => category.slug === categoryType),
    [categories],
  );

  // Filter the post to display based on the specific category chosen
  useMemo(() => {
    const filteredPosts = posts.filter((post) =>
      post.categories.includes(
        (interviewCategory("interview") || categories[0])?.id,
      ),
    );

    setFilteredPosts(filteredPosts);
  }, [categories, interviewCategory, posts]);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  const handleClick = useCallback(
    (title: string) => {
      const filteredPosts = posts.filter((post) =>
        post.categories.includes(
          categories.find((category) => category.slug === title)!.id,
        ),
      );
      setFilteredPosts(filteredPosts);
      setCurrentPage(0);
    },
    [categories, posts],
  );

  return (
    <section>
      <HeroSection
        image={"/interviewhero.jpg"}
        title={"Interview Articles"}
        description="Discover the latest stories here"
      />
      <div className="mx-auto grid max-w-screen-lg grid-cols-1 justify-center py-20 md:grid-cols-2">
        <div className="flex w-full flex-col md:ml-[40%]">
          <h1 className="mx-auto mb-10 text-3xl font-semibold">
            Recent Interviews
          </h1>
          {isLoading && (
            <div className="flex w-full items-center justify-center gap-4 pb-8 text-2xl">
              <Loader2 className="animate-spin" size={50} />
            </div>
          )}
          <Articles
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            path="interviews"
            filteredPosts={filteredPosts}
            isLoading={isLoading}
            posts={posts}
            setFilteredPosts={setFilteredPosts}
            categories={categories}
            handleClick={handleClick}
          />
        </div>

        <InterviewArchive
          categories={categories}
          handleClick={handleClick}
        />
      </div>
    </section>
  );
};

export default InterviewPage;
