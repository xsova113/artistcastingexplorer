"use client";

import Stack from "@/components/Stack";
import { TopNewsCard } from "@/components/TopNewsCard";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TopNews } from "@/types/topnews";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

const options = {
  method: "GET",
  url: "https://movie-articles-and-news.p.rapidapi.com/articles/thr",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_KEY,
    "X-RapidAPI-Host": "movie-articles-and-news.p.rapidapi.com",
  },
};

const TopNewsSection = () => {
  const [isPending, startTransition] = useTransition();
  const [posts, setPosts] = useState<TopNews[]>([]);

  const fetchTopNews = () => {
    try {
      startTransition(() => {
        axios.request(options).then((res) => setPosts(res.data));
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTopNews();
  }, []);

  if (!posts.length || !posts) return;

  return (
    <Stack className="mb-28 mt-10 w-full items-center gap-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-semibold capitalize lg:text-4xl">
          Latest Trendy Articles
        </h1>
        <p className="text-center">
          Explore latest news in the world of hollywood
        </p>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 justify-center gap-4 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-60 w-72" />
          ))}
        </div>
      ) : (
        <div className="mx-8 grid grid-cols-1 justify-center gap-4 md:mx-20 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <TopNewsCard key={post.link} item={post} />
          ))}
        </div>
      )}

      <Link
        href="/top-news"
        className={buttonVariants({
          className:
            "z-50 bg-secondary-foreground px-8 hover:bg-secondary-foreground/80",
        })}
      >
        View All
      </Link>
    </Stack>
  );
};

export default TopNewsSection;
