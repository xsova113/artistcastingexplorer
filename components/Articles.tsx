"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, SetStateAction, useCallback } from "react";
import ReactPaginate from "react-paginate";
import ArticleCard from "./ArticleCard";
import { Post } from "@/types/post";
import MobileArchive from "@/app/(main)/(routes)/news/components/MobileArchive";
import Archive from "@/app/(main)/(routes)/news/components/Archive";
import { usePathname } from "next/navigation";
import InterviewArchive from "@/app/(main)/(routes)/news/components/InterviewArchive";
import { Category } from "@/types/category";
import useMediaQuery from "@/hooks/useMediaQuery";

interface ArticlesProps {
  filteredPosts: Post[];
  path: "news" | "interviews";
  posts: Post[];
  setFilteredPosts: (value: Post[]) => void;
  categories: Category[];
  handleClick: (value: string) => void;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (value: any) => void;
}

const Articles = ({
  filteredPosts,
  path,
  posts,
  setFilteredPosts,
  categories,
  handleClick,
  isLoading,
  currentPage,
  setCurrentPage,
}: ArticlesProps) => {
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery("(min-width: 745px)");
  const itemsPerPage = 2;
  const [totalPages, setTotalPages] = useState(0);
  const pageCount = Math.ceil((filteredPosts?.length || 0) / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  const subset = filteredPosts?.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredPosts?.length / itemsPerPage));
  }, [filteredPosts?.length, itemsPerPage]);

  if ((!filteredPosts || !filteredPosts.length) && !isLoading)
    return (
      <div className="flex w-full items-center justify-center gap-4 pb-8 text-2xl">
        No articles found...
      </div>
    );

  return (
    <div className="flex w-full flex-col px-10">
      {!isLargeScreen && (
        <MobileArchive>
          {pathname === "/news" ? (
            <Archive
              setCurrentPage={setCurrentPage}
              posts={posts}
              setFilteredPosts={setFilteredPosts}
              isMobile
            />
          ) : (
            <InterviewArchive
              categories={categories}
              handleClick={handleClick}
              isMobile
            />
          )}
        </MobileArchive>
      )}

      <div className="flex flex-wrap justify-center gap-4 pb-12 lg:flex-nowrap">
        {subset.map((post) => (
          <ArticleCard
            key={post.id}
            content={post.excerpt.rendered}
            image={post.yoast_head_json.og_image[0].url}
            postId={post.id}
            authorId={post?.author}
            title={post.title.rendered}
            path={path}
            date={post.date}
          />
        ))}
      </div>

      {!filteredPosts || !subset || subset.length === 0 ? null : (
        <ReactPaginate
          nextLabel={<ArrowRight size={20} />}
          previousLabel={<ArrowLeft size={20} />}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center justify-center gap-10"}
          activeClassName="bg-secondary py-1 border px-2 rounded"
          disabledClassName="opacity-40"
        />
      )}
    </div>
  );
};

export default Articles;
