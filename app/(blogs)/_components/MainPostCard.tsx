"use client";

import ProfileAvatar from "@/components/ProfileAvatar";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Author } from "@/types/author";
import { BlogPost } from "@/types/post";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface MainPostCardProps {
  path: "news" | "interviews" | "news1" | "interviews1";
  post: BlogPost;
}
const MainPostCard = ({ path, post }: MainPostCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [author, setAuthor] = useState<Author>();

  const fetchAuthor = useCallback(async () => {
    await client
      .fetch(`*[_type == 'author' && _id == "${post.author._ref}"][0]`)
      .then((res) => setAuthor(res));
  }, [post.author._ref]);

  useEffect(() => {
    fetchAuthor();
    setIsMounted(true);
  }, [fetchAuthor]);

  if (!isMounted) return null;

  return (
    <Link
      href={`/${path}/${post.slug.current}`}
      className="relative flex w-full flex-col items-start overflow-clip rounded-xl border shadow max-md:h-[650px] md:flex-row md:items-center"
    >
      <div className="relative h-96 w-full basis-1/2">
        <Image
          fill
          src={urlForImage(post.mainImage).fit("max").toString()}
          alt={`${post.slug}`}
          loading="eager"
          className="object-cover"
        />
      </div>
      <div className="flex basis-1/2 flex-col gap-y-4 p-4 md:px-10">
        <div className="flex items-center gap-2">
          {author?.image && (
            <ProfileAvatar
              image={urlForImage(author.image).toString()}
              className="ring"
            />
          )}

          <div className="flex flex-col">
            <h3 className="text-sm text-muted-foreground">{author?.name}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold md:text-2xl">{post.title}</h1>
          <p className="line-clamp-2">{post.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">
            {format(new Date(post?.publishedAt), "MMMM dd, yyyy")}
          </span>
        </div>
        <Link
          href={`/${path}/${post.slug.current}`}
          className="absolute bottom-6 mt-auto flex items-center text-sm font-bold underline-offset-4 hover:underline"
        >
          Read More <ChevronRight className="ml-2" size={18} />
        </Link>
      </div>
    </Link>
  );
};

export default MainPostCard;
