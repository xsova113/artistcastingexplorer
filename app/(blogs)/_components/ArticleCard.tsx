// "use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { BlogPost } from "@/types/post";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  path: "news" | "interviews" | "news1" | "interviews1";
  post: BlogPost;
}

const ArticleCard = async ({ post, path }: ArticleCardProps) => {
  const author = await client.fetch(
    `*[_type == 'author' && _id == "${post.author._ref}"][0]`,
  );

  return (
    <Link
      href={`/${path}/${post.slug.current}`}
      className="rounded-2xl max-lg:overflow-y-clip"
    >
      <Card className="flex h-[400px] w-[330px] flex-col overflow-clip rounded-2xl border-none shadow-none drop-shadow max-lg:overflow-clip">
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
              <div className="flex items-center justify-between">
                <p className="w-fit text-sm">{author.name}</p>
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
