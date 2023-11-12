"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const monthYearString = (num: number) => {
  return (currentMonth + num).toString() + currentYear.toString();
};

interface ArchiveProps {
  setFilteredPosts: (value: Post[]) => void;
  isMobile?: boolean;
  posts: Post[];
  setCurrentPage: (value: any) => void;
}

const Archive = ({
  setFilteredPosts,
  isMobile,
  posts,
  setCurrentPage,
}: ArchiveProps) => {
  const [groupedByDateItems, setGroupedByDateItems] = useState<any>();

  const handleClick = (posts: any, monthYear: string) => {
    const archivedPosts = posts.map((item: any) => item[monthYear])[0];
    setFilteredPosts(archivedPosts);
    setCurrentPage(0);
  };

  useMemo(() => {
    const groupedItems = posts.reduce((results: any, post): Post => {
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

  if (!groupedByDateItems) return;

  const groupedArray: { [key: string]: Post[] }[] = Object.keys(
    groupedByDateItems,
  ).map((date) => {
    return {
      [date]: groupedByDateItems[date],
    };
  });

  const filteredGroupedItems = (num: number) =>
    groupedArray.filter(
      (item) => Object.keys(item)[0] === monthYearString(num),
    );

  const filteredGroupedArray = (num: number): number => {
    const arrayLength =
      filteredGroupedItems(num).map(
        (item) => item[monthYearString(num)].length,
      )[0] || 0;

    return arrayLength;
  };

  return (
    <div
      className={cn(
        "flex-col md:ml-auto md:flex md:pr-10 md:pt-16",
        isMobile ? "block" : "hidden",
      )}
    >
      <h2 className="text-lg font-semibold underline underline-offset-4">
        Archives
      </h2>
      <article className="mt-6 flex flex-col items-start gap-x-4">
        <h4 className="mb-2 font-semibold">{currentYear}</h4>
        <div className="flex flex-col items-start gap-x-4">
          <Button
            onClick={() =>
              handleClick(filteredGroupedItems(1), monthYearString(1))
            }
            variant={"link"}
            className="p-0 font-semibold text-muted-foreground"
          >
            {dayjs((currentMonth + 1).toString()).format("MMMM")} (
            {filteredGroupedArray(1)})
          </Button>
          <Button
            onClick={() =>
              handleClick(filteredGroupedItems(0), monthYearString(0))
            }
            variant={"link"}
            className="p-0 font-semibold text-muted-foreground"
          >
            {dayjs(currentMonth.toString()).format("MMMM")} (
            {filteredGroupedArray(0)})
          </Button>
          <Button
            onClick={() =>
              handleClick(filteredGroupedItems(-1), monthYearString(-1))
            }
            variant={"link"}
            className="p-0 font-semibold text-muted-foreground"
          >
            {dayjs((currentMonth - 1).toString()).format("MMMM")} (
            {filteredGroupedArray(-1)})
          </Button>
          <Button
            onClick={() =>
              handleClick(filteredGroupedItems(-2), monthYearString(-2))
            }
            variant={"link"}
            className="p-0 font-semibold text-muted-foreground"
          >
            {dayjs((currentMonth - 2).toString()).format("MMMM")} (
            {filteredGroupedArray(-2)})
          </Button>
        </div>
      </article>
    </div>
  );
};

export default Archive;
