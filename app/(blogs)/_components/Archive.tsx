"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/post";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useState } from "react";
// const currentYear = new Date().getFullYear();
// const currentMonth = new Date().getMonth();
// const monthYearString = (num: number) => {
//   return (currentMonth + num).toString() + currentYear.toString();
// };

dayjs.extend(isBetween);

interface ArchiveProps {
  // setFilteredPosts: (value: BlogPost[]) => void;
  isMobile?: boolean;
  posts: BlogPost[];
  // setCurrentPage: (value: any) => void;
}

const Archive = ({
  // setFilteredPosts,
  isMobile,
  posts, // setCurrentPage,
}: ArchiveProps) => {
  // const [groupedByDateItems, setGroupedByDateItems] = useState<any>();
  const [timePeriod, setTimePeriod] = useState<{
    year: number;
    month: number;
  }>({
    year: new Date().getFullYear(),
    month: new Date().getFullYear(),
  });

  const filteredPosts = ({ year, month }: { year: number; month: number }) =>
    posts.filter((post) => dayjs(post._createdAt).isSame(`${year}-${month}`));

  const handleClick = (posts: any, monthYear: string) => {
    // const archivedPosts = posts.map((item: any) => item[monthYear])[0];
    // setFilteredPosts(archivedPosts);
    // setCurrentPage(0);
  };

  // useMemo(() => {
  //   const groupedItems = posts.reduce((results: any, post): Post => {
  //     (results[
  //       (new Date(post._createdAt).getMonth() + 1).toString() +
  //         new Date(post._createdAt).getFullYear().toString()
  //     ] =
  //       results[
  //         (new Date(post._createdAt).getMonth() + 1).toString() +
  //           new Date(post._createdAt).getFullYear().toString()
  //       ] || []).push(post);
  //     return results;
  //   }, {});

  //   setGroupedByDateItems(groupedItems);
  // }, [posts]);

  // if (!groupedByDateItems) return;

  // const groupedArray: { [key: string]: Post[] }[] = Object.keys(
  //   groupedByDateItems,
  // ).map((date) => {
  //   return {
  //     [date]: groupedByDateItems[date],
  //   };
  // });

  // const filteredGroupedItems = (num: number) =>
  //   groupedArray.filter(
  //     (item) => Object.keys(item)[0] === monthYearString(num),
  //   );

  // const filteredGroupedArray = (num: number): number => {
  //   const arrayLength =
  //     filteredGroupedItems(num).map(
  //       (item) => item[monthYearString(num)].length,
  //     )[0] || 0;

  //   return arrayLength;
  // };

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
      {filteredPosts({
        year: 2023,
        month: 12
      }).map((post) => (
        <div key={post._id}>{post.title}</div>
      ))}
      {/* <article className="mt-6 flex flex-col items-start gap-x-4">
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
      </article> */}
    </div>
  );
};

export default Archive;
