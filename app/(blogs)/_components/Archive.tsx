"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/post";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import qs from "query-string";
import { useRouter } from "next/navigation";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

dayjs.extend(isBetween);

interface ArchiveProps {
  isMobile?: boolean;
  posts: BlogPost[];
}

const Archive = ({ isMobile, posts }: ArchiveProps) => {
  const router = useRouter();
  const filteredPosts = ({ month }: { month: number }) =>
    posts.filter((post) =>
      dayjs(post._createdAt).isSame(`${currentYear}-${month}`, "month"),
    );

  const handleClick = ({ month }: { month: number }) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          month,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url, { scroll: false });
  };

  return (
    <div className={cn("flex-col md:ml-auto md:flex md:pr-10 md:pt-16")}>
      <h2 className="text-lg font-semibold underline underline-offset-4">
        Archives
      </h2>
      <div className="mt-6 flex flex-col items-start gap-x-4">
        <h4 className="mb-2 font-semibold">{currentYear}</h4>
        <div className="flex flex-col items-start gap-x-4">
          <Button
            onClick={() => handleClick({ month: currentMonth })}
            variant={"link"}
            className="p-0 font-semibold text-muted-foreground"
          >
            {dayjs(currentMonth.toString()).format("MMMM")} (
            {filteredPosts({ month: currentMonth }).length})
          </Button>
          <Button
            onClick={() => handleClick({ month: currentMonth - 1 })}
            variant={"link"}
            className="p-0 font-semibold text-muted-foreground"
          >
            {dayjs((currentMonth - 1).toString()).format("MMMM")} (
            {filteredPosts({ month: currentMonth - 1 }).length})
          </Button>
          <Button
            onClick={() => handleClick({ month: currentMonth - 2 })}
            variant={"link"}
            className="p-0 font-semibold text-muted-foreground"
          >
            {dayjs((currentMonth - 2).toString()).format("MMMM")} (
            {filteredPosts({ month: currentMonth - 2 }).length})
          </Button>
          <Button
            onClick={() => handleClick({ month: currentMonth - 3 })}
            variant={"link"}
            className="p-0 font-semibold text-muted-foreground"
          >
            {dayjs((currentMonth - 3).toString()).format("MMMM")} (
            {filteredPosts({ month: currentMonth - 3 }).length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Archive;
