"use client";

import HeroSection from "@/components/HeroSection";
import Articles from "../../../../components/Articles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Post } from "@/types/post";
import { Category, Slug } from "@/types/category";
import axios from "axios";
import { Button } from "@/components/ui/button";
import NewsPage from "../news/page";

// TODO: Add categories / subcategories as Title type

type Title = "actor" | "model" | "singer" | "musician";

const InterviewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Get all posts
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

  // Get all categories
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

  // Get specific category
  const interviewCategory = useCallback(
    (categoryType: Slug = "uncategorized") =>
      categories.find((category) => category.slug === categoryType),
    [categories]
  );

  // Filter the post to display based on the specific category chosen
  useMemo(() => {
    const filteredPosts = posts.filter(
      (post) => post.categories[0] === interviewCategory("uncategorized")?.id
    );
    setFilteredPosts(filteredPosts);
  }, [interviewCategory, posts]);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  // TODO: Change the arguement type to Title type
  const handleClick = useCallback(
    (title: Slug) => {
      const filteredPosts = posts.filter(
        (post) => post.categories[0] === interviewCategory(title)?.id
      );
      setFilteredPosts(filteredPosts);
    },
    [interviewCategory, posts]
  );

  return (
    <section>
      <HeroSection
        image={"/interviewhero.jpg"}
        title={"Interview"}
        description="Check out our latest interview articles where we discuss [fill in]"
      />
      <div className="flex flex-col md:flex-row py-20 justify-center max-w-screen-lg mx-auto">
        <Articles
          path="interviews"
          filteredPosts={filteredPosts}
          isLoading={isLoading}
          title={"Recent Interviews"}
        />
        <div className="flex flex-col pt-16 md:pr-10 max-md:items-center md:ml-auto">
          <h2 className="font-semibold text-lg underline underline-offset-4">
            Archives
          </h2>
          <article className="flex flex-col mt-6 md:items-start items-center gap-x-4">
            <div className="flex md:flex-col gap-x-4 items-start">
              <Button
                onClick={() => handleClick("interview")}
                variant={"link"}
                className="font-semibold p-0 text-muted-foreground"
              >
                Actor ({interviewCategory("interview")?.count})
              </Button>
              <Button
                onClick={() => handleClick("news")}
                variant={"link"}
                className="font-semibold p-0 text-muted-foreground"
              >
                Model ({interviewCategory("news")?.count})
              </Button>
              <Button
                onClick={() => handleClick("uncategorized")}
                variant={"link"}
                className="font-semibold p-0 text-muted-foreground"
              >
                Singer ({interviewCategory("uncategorized")?.count})
              </Button>
              <Button
                onClick={() => handleClick("interview")}
                variant={"link"}
                className="font-semibold p-0 text-muted-foreground"
              >
                Musician ({interviewCategory("interview")?.count})
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default InterviewPage;
