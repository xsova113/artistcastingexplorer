"use client";

import HeroSection from "@/components/HeroSection";
import Articles from "../../../../components/Articles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Post } from "@/types/post";
import { Category, Slug } from "@/types/category";
import axios from "axios";
import { Button } from "@/components/ui/button";

// TODO: Add categories / subcategories as Title type

type Title = "actors" | "model" | "singer" | "musician" | "interview";

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
    (categoryType: Title = "interview") =>
      categories.find((category) => category.slug === categoryType),
    [categories],
  );

  // Filter the post to display based on the specific category chosen
  useMemo(() => {
    const filteredPosts = posts.filter((post) =>
      post.categories.includes(interviewCategory("interview")!.id),
    );

    setFilteredPosts(filteredPosts);
  }, [interviewCategory, posts]);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  // TODO: Change the arguement type to Title type
  const handleClick = useCallback(
    (title: Title) => {
      const filteredPosts = posts.filter(
        (post) => post.categories[0] === interviewCategory(title)?.id,
      );
      setFilteredPosts(filteredPosts);
    },
    [interviewCategory, posts],
  );

  return (
    <section>
      <HeroSection
        image={"/interviewhero.jpg"}
        title={"Interview"}
        description="Check out our latest interview articles where we discuss [fill in]"
      />
      <div className="mx-auto flex max-w-screen-lg flex-col justify-center py-20 md:flex-row">
        <Articles
          path="interviews"
          filteredPosts={filteredPosts}
          isLoading={isLoading}
          title={"Recent Interviews"}
        />
        <div className="flex flex-col pt-16 max-md:items-center md:ml-auto md:pr-10">
          <h2 className="text-lg font-semibold underline underline-offset-4">
            Archives
          </h2>
          <article className="mt-6 flex flex-col items-center gap-x-4 md:items-start">
            <div className="flex items-start gap-x-4 md:flex-col">
              <Button
                onClick={() => handleClick("actors")}
                variant={"link"}
                className="p-0 font-semibold text-muted-foreground"
              >
                Actor ({interviewCategory("actors")?.count})
              </Button>
              <Button
                onClick={() => handleClick("model")}
                variant={"link"}
                className="p-0 font-semibold text-muted-foreground"
              >
                Model ({interviewCategory("model")?.count})
              </Button>
              <Button
                onClick={() => handleClick("singer")}
                variant={"link"}
                className="p-0 font-semibold text-muted-foreground"
              >
                Singer ({interviewCategory("singer")?.count})
              </Button>
              <Button
                onClick={() => handleClick("musician")}
                variant={"link"}
                className="p-0 font-semibold text-muted-foreground"
              >
                Musician ({interviewCategory("musician")?.count})
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default InterviewPage;
