"use client";

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

  // if (true) {
  //   return (
  //     <div className="container grid grid-cols-3 gap-8">
  //       {[...Array(5)].map((_, i) => (
  //         <Skeleton key={i} className="h-20 w-full" />
  //       ))}
  //     </div>
  //   );
  // }

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
      <div className="grid grid-cols-3 gap-4">
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
                className="flex flex-col gap-y-8 rounded-md border p-4 shadow-lg"
              >
                <div className="flex flex-col gap-y-4">
                  <h2 className="text-xl font-medium">{item.title}</h2>
                  <p className="line-clamp-4 text-sm text-muted-foreground text-neutral-700">
                    {item.summary}
                  </p>
                </div>
                <span className="mt-auto text-xs text-muted-foreground">
                  {item.source}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default TopNewsPage;
