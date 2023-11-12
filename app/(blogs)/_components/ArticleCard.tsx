"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Author } from "@/types/author";
import { BlogPost } from "@/types/post";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface ArticleCardProps {
  path: "news" | "interviews"
  post: BlogPost;
}

const ArticleCard = ({ post, path }: ArticleCardProps) => {
  const [author, setAuthor] = useState<Author>();

  const fetchAuthor = useCallback(
    async () =>
      await client
        .fetch(`*[_type == 'author' && _id == "${post.author._ref}"][0]`)
        .then((res) => setAuthor(res)),
    [post.author._ref],
  );

  useEffect(() => {
    fetchAuthor();
  }, [fetchAuthor]);

  return (
    <Link
      href={`/${path}/${post.slug.current}`}
      className="max-w-[330px] rounded-2xl border shadow max-lg:overflow-y-clip"
    >
      <Card className="flex h-[350px] w-[310px] flex-col overflow-clip rounded-2xl border-none shadow-none drop-shadow max-lg:overflow-clip">
        <div className="flex h-full flex-col bg-gradient-to-b from-transparent to-black">
          <div className={cn("absolute -z-50 h-full w-full max-lg:w-[330px]")}>
            <Image
              src={urlForImage(post.mainImage).toString()}
              alt={"featured image"}
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-auto">
            <CardHeader className="pb-2 text-white">
              <CardTitle className="line-clamp-2 text-lg">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4 text-muted">
              <div className="flex items-center justify-between max-md:w-[220px]">
                <p className="w-fit text-sm">{author?.name}</p>
                <span className="text-xs">
                  {format(new Date(post._createdAt), "MMMM dd, yyyy")}
                </span>
              </div>
              <Link
                href={`/${path}/${post.slug.current}`}
                className="flex items-center text-sm font-bold text-white underline-offset-4 hover:underline"
              >
                Read More <ChevronRight className="ml-2" size={18} />
              </Link>
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
