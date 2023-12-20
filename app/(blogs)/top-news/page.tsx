"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TopNews } from "@/types/topnews";
import axios from "axios";
import { ArrowRight } from "lucide-react";
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

const TopNewsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [topNews, setTopNews] = useState<TopNews[]>([]);

  const fetchTopNews = async () =>
    await axios.request(options).then((res) => {
      startTransition(() => {
        setTopNews(res.data);
      });
    });

  useEffect(() => {
    fetchTopNews();
  }, []);

  if (!topNews.length && !topNews) {
    return <p className="container">No news found...</p>;
  }

  return (
    <section>
      <div className="mb-12 flex flex-col gap-y-4">
        <h1 className="text-4xl font-semibold md:text-5xl">Top Trendy News</h1>
        <h3 className="text-muted-foreground">
          Explore latest news in the world of hollywood
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          <>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </>
        ) : (
          <>
            {topNews.map((item) => (
              <Link
                href={item.link}
                key={item.title + item.link}
                className="flex flex-col gap-y-5 rounded-md border p-3 shadow-lg"
              >
                <h2 className="rounded bg-sky-900 p-3 text-xl font-medium text-white/90 drop-shadow">
                  {item.title}
                </h2>
                <div className="flex flex-col">
                  <p className="line-clamp-4 text-sm text-muted-foreground text-neutral-700">
                    {item.summary}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {item.source}
                  </span>
                  <span className="flex items-center text-sm font-bold">
                    Read more <ArrowRight className="h-4 w-4 ml-1.5" />
                  </span>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default TopNewsPage;
