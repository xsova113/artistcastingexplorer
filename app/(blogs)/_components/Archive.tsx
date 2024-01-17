"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/post";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import qs from "query-string";
import { useRouter } from "next/navigation";

const currentYear = new Date().getFullYear();
const prevYear = new Date().getFullYear() - 1;
const currentMonth = new Date().getMonth();

dayjs.extend(isBetween);

interface ArchiveProps {
  isMobile?: boolean;
  posts: BlogPost[];
}

const Archive = ({ isMobile, posts }: ArchiveProps) => {
  const router = useRouter();
  const filteredPosts = ({ month }: { month: number }) =>
    posts.filter((post) =>
      dayjs(post._createdAt).isSame(`${prevYear}-${month}`, "month"),
    );

  const handleClick = ({ month }: { month: number }) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          month,
          currentPage: 0,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url, { scroll: false });
  };

  return (
    <div
      className={cn(
        "mx-auto w-[130px] flex-col sm:ml-auto sm:flex sm:pr-10 sm:pt-16",
        isMobile ? "block" : "hidden",
      )}
    >
      <h2 className="text-lg font-semibold underline underline-offset-4">
        Archives
      </h2>
      <div className="mt-6 flex flex-col items-start gap-x-4">
        <h4 className="mb-2 font-semibold">{prevYear}</h4>
        <div className="flex flex-col items-start gap-x-4">
          <Button
            onClick={() => handleClick({ month: 12 })}
            variant={"link"}
            className="p-0 text-xs font-semibold text-muted-foreground"
          >
            {dayjs(new Date("12")).format("MMMM")} (
            {filteredPosts({ month: 12 }).length})
          </Button>
          <Button
            onClick={() => handleClick({ month: 11 })}
            variant={"link"}
            className="p-0 text-xs font-semibold text-muted-foreground"
          >
            {dayjs(new Date("11")).format("MMMM")} (
            {filteredPosts({ month: 11 }).length})
          </Button>
          <Button
            onClick={() => handleClick({ month: 10 })}
            variant={"link"}
            className="p-0 text-xs font-semibold text-muted-foreground"
          >
            {dayjs(new Date("10")).format("MMMM")} (
            {filteredPosts({ month: 10 }).length})
          </Button>
          <Button
            onClick={() => handleClick({ month: 9 })}
            variant={"link"}
            className="p-0 text-xs font-semibold text-muted-foreground"
          >
            {dayjs(new Date("9")).format("MMMM")} (
            {filteredPosts({ month: 9 }).length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Archive;
