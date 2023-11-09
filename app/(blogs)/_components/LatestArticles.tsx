"use client";

import { BlogPost } from "@/types/post";
import ArticleCard from "./ArticleCard";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

interface LatestArticlesProps {
  posts: BlogPost[];
}

const LatestArticles = ({ posts }: LatestArticlesProps) => {
  const itemsPerPage = 2;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil((posts?.length || 0) / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  const subset = posts?.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(posts?.length / itemsPerPage));
  }, [itemsPerPage, posts?.length]);

  if (!posts || !posts.length)
    return (
      <div className="flex w-full items-center justify-center gap-4 pb-8 text-2xl">
        No articles found...
      </div>
    );
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl font-semibold">Latest Articles</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {subset.map((post) => (
          <ArticleCard path="news1" post={post} key={post._id} />
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
