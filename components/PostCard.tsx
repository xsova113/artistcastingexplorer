"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

interface PostCardProps {
  title: string;
  postId: number;
  authorId: number;
  featuredImage?: string;
  content: string;
  date: string;
}

const PostCard = ({
  content,
  date,
  title,
  postId,
  featuredImage,
  authorId,
}: PostCardProps) => {
  const router = useRouter();

  const fetchAuthor = async () => {
    const response = await axios.get(
      `https://castingjapanese.ca/wp-json/wp/v2/users/${authorId}`,
    );

    return response.data;
  };

  const { data: author } = useQuery("author", fetchAuthor);

  return (
    <Card className="mb-4 h-[560px] md:mx-4">
      <CardHeader>
        <div className="relative mb-2 h-[280px] w-full">
          {featuredImage && (
            <Image
              src={featuredImage}
              alt={"Featured Image"}
              fill
              className="rounded object-cover"
              loading="lazy"
            />
          )}
        </div>
        <CardTitle
          className="cursor-pointer"
          onClick={() => router.push(`/news/${postId}`)}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <div
        className="flex h-[33%] cursor-pointer flex-col"
        onClick={() => router.push(`/news/${postId}`)}
      >
        <CardContent>
          <p className="line-clamp-3">{content}</p>
        </CardContent>
        <CardFooter className="mt-auto">
          <p className="flex w-full items-center">
            By {author?.name} - {dayjs(date).format("MMM DD, YYYY")}
            <ArrowRight size={20} className="ml-auto" />
          </p>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
