"use client";

import HeroSection from "@/components/HeroSection";
import Articles from "../../../../components/Articles";
import { useEffect, useMemo, useState } from "react";
import { Post } from "@/types/post";
import { Category } from "@/types/category";
import axios from "axios";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const monthYearString = (num: number) => {
  return (currentMonth + num).toString() + currentYear.toString();
};

const NewsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [groupedByDateItems, setGroupedByDateItems] = useState<any>();

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

  const newsCategory = categories.find(
    (category) => category.slug === "uncategorized"
  );

  useMemo(() => {
    const filteredPosts = posts.filter(
      (post) => post.categories[0] === newsCategory?.id
    );
    setFilteredPosts(filteredPosts);
  }, [newsCategory?.id, posts]);

  useMemo(() => {
    const groupedItems = posts?.reduce((results: any, post): Post => {
      (results[
        (new Date(post.date).getMonth() + 1).toString() +
          new Date(post.date).getFullYear().toString()
      ] =
        results[
          (new Date(post.date).getMonth() + 1).toString() +
            new Date(post.date).getFullYear().toString()
        ] || []).push(post);
      return results;
    }, {});

    setGroupedByDateItems(groupedItems);
  }, [posts]);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  if (!groupedByDateItems) return;

  const groupedArray: { [key: string]: Post[] }[] = Object.keys(
    groupedByDateItems
  ).map((date) => {
    return {
      [date]: groupedByDateItems[date],
    };
  });

  const filteredGroupedItems = (num: number) =>
    groupedArray.filter(
      (item) => Object.keys(item)[0] === monthYearString(num)
    );

  const filteredGroupedArray = (num: number): number => {
    const arrayLength =
      filteredGroupedItems(num).map(
        (item) => item[monthYearString(num)].length
      )[0] || 0;

    return arrayLength;
  };

  const handleClick = (posts: any, monthYear: string) => {
    const archivedPosts = posts.map((item: any) => item[monthYear])[0];
    setFilteredPosts(archivedPosts);
  };

  console.log(filteredGroupedItems(1).map((items) => items[92023])[0]);

  return (
    <section>
      <HeroSection
        image={"/heronews.jpg"}
        title={"News"}
        description="Check out our latest articles and interviews"
      />
      <div className="flex flex-col md:flex-row py-20 justify-center max-w-screen-lg mx-auto">
        <Articles
          filteredPosts={filteredPosts}
          isLoading={isLoading}
          title={"Recent News"}
          path={"news"}
        />
        <div className="flex flex-col pt-16 md:pr-10 max-md:items-center md:ml-auto">
          <h2 className="font-semibold text-lg underline underline-offset-4">
            Archives
          </h2>
          <article className="flex flex-col mt-6 md:items-start items-center gap-x-4">
            <h4 className="font-semibold mb-2">{currentYear}</h4>
            <div className="flex md:flex-col gap-x-4 items-start">
              <Button
                onClick={() =>
                  handleClick(filteredGroupedItems(1), monthYearString(1))
                }
                variant={"link"}
                className="font-semibold p-0 text-muted-foreground"
              >
                {dayjs((currentMonth + 1).toString()).format("MMMM")} (
                {filteredGroupedArray(1)})
              </Button>
              <Button
                onClick={() =>
                  handleClick(filteredGroupedItems(0), monthYearString(0))
                }
                variant={"link"}
                className="font-semibold p-0 text-muted-foreground"
              >
                {dayjs(currentMonth.toString()).format("MMMM")} (
                {filteredGroupedArray(0)})
              </Button>
              <Button
                onClick={() =>
                  handleClick(filteredGroupedItems(-1), monthYearString(-1))
                }
                variant={"link"}
                className="font-semibold p-0 text-muted-foreground"
              >
                {dayjs((currentMonth - 1).toString()).format("MMMM")} (
                {filteredGroupedArray(-1)})
              </Button>
              <Button
                onClick={() =>
                  handleClick(filteredGroupedItems(-2), monthYearString(-2))
                }
                variant={"link"}
                className="font-semibold p-0 text-muted-foreground"
              >
                {dayjs((currentMonth - 2).toString()).format("MMMM")} (
                {filteredGroupedArray(-2)})
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
