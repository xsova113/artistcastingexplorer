"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect, SetStateAction } from "react";
import ReactPaginate from "react-paginate";
import ArticleCard from "./ArticleCard";
import { Post } from "@/types/post";
import MobileArchive from "@/app/(main)/(routes)/news/components/MobileArchive";
import Archive from "@/app/(main)/(routes)/news/components/Archive";
import { usePathname } from "next/navigation";
import InterviewArchive from "@/app/(main)/(routes)/news/components/InterviewArchive";
import { Category } from "@/types/category";

interface ArticlesProps {
  filteredPosts: Post[];
  path: "news" | "interviews";
  fetchPosts: () => void;
  posts: Post[];
  setFilteredPosts: (value: Post[]) => void;
  categories: Category[];
  handleClick: (value: string) => void;
}

const Articles = ({
  filteredPosts,
  path,
  posts,
  setFilteredPosts,
  categories,
  handleClick,
}: ArticlesProps) => {
  const pathname = usePathname();
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);
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
  }, [filteredPosts?.length]);

  return (
    <div className="flex flex-col px-10">
      <MobileArchive>
        {pathname === "/news" ? (
          <Archive posts={posts} setFilteredPosts={setFilteredPosts} isMobile />
        ) : (
          <InterviewArchive
            categories={categories}
            handleClick={handleClick}
            isMobile
          />
        )}
      </MobileArchive>
      <div className="flex flex-wrap justify-center gap-4 pb-12">
        {subset.map((post) => (
          <ArticleCard
            key={post.id}
            content={post.uagb_excerpt}
            author={post.uagb_author_info.display_name}
            image={post.uagb_featured_image_src.medium[0]}
            postId={post.id}
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
