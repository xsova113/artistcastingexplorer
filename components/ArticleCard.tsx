"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WPUser } from "@/types/wpUser";
import axios from "axios";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface ArticleCardProps {
  title: string;
  image?: string;
  postId: number;
  authorId: number;
  path: "news" | "interviews";
  date: string;
  content?: string;
}

const ArticleCard = ({
  title,
  image,
  postId,
  path,
  authorId,
  content,
  date,
}: ArticleCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [author, setAuthor] = useState<WPUser>();

  const fetchAuthor = useCallback(async () => {
    if (!authorId) return;

    const response = await axios.get(
      `https://castingjapanese.ca/wp-json/wp/v2/users/${authorId}`,
    );
    setAuthor(response.data);
    return response.data;
  }, [authorId]);

  useEffect(() => {
    fetchAuthor();
  }, [fetchAuthor]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Link href={`/${path}/${postId}`} className="max-lg:overflow-y-clip rounded-2xl">
      <Card className="flex h-[400px] w-[330px] flex-col overflow-clip rounded-2xl border-none shadow-none drop-shadow max-lg:overflow-clip">
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
              {/* <div
                className="line-clamp-3 text-sm text-muted"
                dangerouslySetInnerHTML={{ __html: content || "" }}
              /> */}
              <div className="flex items-center justify-between">
                <p className="w-fit text-sm">{author?.name}</p>
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
