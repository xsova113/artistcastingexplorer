"use client";

import { BlogPost } from "@/types/post";
import ArticleCard from "./ArticleCard";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Archive from "./Archive";
import qs from "query-string";
import MobileArchive from "./MobileArchive";
import InterviewArchive from "./InterviewArchive";
import { Category } from "@/types/category";

interface LatestArticlesProps {
  posts: BlogPost[];
  categories?: Category[];
  path: "news" | "interviews";
}

const LatestArticles = ({ posts, categories, path }: LatestArticlesProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLargeScreen = useMediaQuery("(min-width: 640px)");
  const pathname = usePathname();
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);
  const pageCount = Math.ceil((posts?.length || 0) / itemsPerPage);
  const startIndex = Number(searchParams.get("currentPage")) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          currentPage: Number(selectedPage.selected),
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url, { scroll: false });
  };

  const subset = posts?.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(posts?.length / itemsPerPage));
    setIsMounted(true);
  }, [itemsPerPage, posts?.length]);

  if (!isMounted) return null;

  if (!posts || !posts.length)
    return (
      <div className="flex w-full items-center justify-center gap-4 pb-8 text-2xl">
        No articles found...
      </div>
    );

  return (
    <div className="flex flex-col gap-y-6 max-sm:items-center">
      <h2 className="text-2xl font-semibold">Latest Articles</h2>

      {!isLargeScreen && (
        <MobileArchive>
          {pathname === "/news" ? (
            <Archive posts={posts} isMobile />
          ) : (
            <InterviewArchive isMobile categories={categories} />
          )}
        </MobileArchive>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {subset.map((post) => (
          <ArticleCard path={path} post={post} key={post._id} />
        ))}
      </div>

      {!posts || !subset || subset.length === 0 ? null : (
        <ReactPaginate
          nextLabel={<ArrowRight size={20} />}
          previousLabel={<ArrowLeft size={20} />}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center justify-center gap-10"}
          activeClassName="bg-secondary py-1 border px-2 rounded"
          disabledClassName="opacity-40"
          className="z-50 mt-3 flex items-center justify-center gap-x-8"
        />
      )}
    </div>
  );
};

export default LatestArticles;
