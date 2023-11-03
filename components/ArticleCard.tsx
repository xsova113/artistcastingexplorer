"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ArticleCardProps {
  title: string;
  author?: string;
  image?: string;
  postId: number;
  path: "news" | "interviews";
  date: string;
  content?: string;
}

const ArticleCard = ({
  title,
  author,
  image,
  postId,
  path,
  content,
  date,
}: ArticleCardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Link href={`/${path}/${postId}`}>
      <Card className="flex h-[400px] w-[330px] flex-col overflow-clip rounded-2xl border-none shadow-none drop-shadow">
        <div className="flex h-full flex-col bg-gradient-to-b from-transparent to-black">
          <div
            className={cn("absolute -z-50 h-full w-full", !image && "hidden")}
          >
            <Image
              src={image || "/placeholder.png"}
              alt={"featured image"}
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-auto">
            <CardHeader className="pb-2 text-white">
              <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4 text-muted">
              <p className="line-clamp-3 text-sm text-muted">{content}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm">{author}</p>
                <span className="text-xs">
                  {format(new Date(date), "MMMM dd, yyyy")}
                </span>
              </div>
              <Link
                href={`/${path}/${postId}`}
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
