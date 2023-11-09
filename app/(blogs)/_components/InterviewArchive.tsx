"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category";

interface InterviewArchiveProps {
  categories?: Category[];
  isMobile?: boolean;
}

const InterviewArchive = ({ categories, isMobile }: InterviewArchiveProps) => {
  const router = useRouter();

  const handleClick = (category: string) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          category,
          currentPage: 0
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url, { scroll: false });
    router.refresh();
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
      <article className="mt-6 flex flex-col items-center gap-x-4 md:items-start">
        <div className="flex flex-wrap items-start max-sm:gap-4 md:flex-col">
          {categories ? (
            categories
              .filter((category) => category.title !== "news")
              .sort((a, b) => (a.title > b.title ? 1 : -1))
              .map((category) => (
                <Button
                  key={category._id}
                  onClick={() => handleClick(category.title)}
                  variant={"link"}
                  className="p-0 font-semibold text-muted-foreground"
                >
                  {category.title}
                </Button>
              ))
          ) : (
            <div className="py-10 text-muted-foreground">No categories...</div>
          )}
        </div>
      </article>
    </div>
  );
};

export default InterviewArchive;
