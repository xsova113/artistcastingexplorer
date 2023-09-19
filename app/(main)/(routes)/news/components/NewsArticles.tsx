"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect, SetStateAction } from "react";
import ReactPaginate from "react-paginate";
import ArticleCard from "./ArticleCard";
import { Post } from "@/types/post";

interface NewsArticlesProps {
  filteredPosts: Post[];
  isLoading: boolean;
}

const NewsArticles = ({ filteredPosts, isLoading }: NewsArticlesProps) => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageCount = Math.ceil(filteredPosts.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  const subset = filteredPosts.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredPosts.length / itemsPerPage));
  }, [filteredPosts.length]);

  return (
    <div>
      <div className="px-10 flex flex-col">
        <h1 className="mx-auto mb-10 text-3xl font-semibold">Recent News</h1>

        {isLoading && (
          <div className="w-full flex justify-center items-center text-2xl gap-4 pb-8">
            Loading...
            <Loader2 className="animate-spin" size={50} />
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 pb-8">
          {subset.map((post) => (
            <ArticleCard
              key={post.id}
              author={post.uagb_author_info.display_name}
              image={post.uagb_featured_image_src.medium[0]}
              postId={post.id}
              title={post.title.rendered}
            />
          ))}
        </div>

        <ReactPaginate
          nextLabel={<ArrowRight />}
          previousLabel={<ArrowLeft />}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center justify-center gap-24"}
          activeClassName="bg-secondary py-1 px-2 rounded"
        />
      </div>
    </div>
  );
};

export default NewsArticles;
