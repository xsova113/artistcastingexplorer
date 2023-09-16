import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUsersQuery } from "@/redux/postsApi/user";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const { data: author } = useGetUsersQuery(authorId);
  const router = useRouter();

  return (
    <Card className="mx-4 mb-4 h-[560px]">
      <CardHeader>
        <div className="relative w-full h-[280px] mb-2">
          {featuredImage && (
            <Image
              src={featuredImage}
              alt={"Featured Image"}
              fill
              className="object-cover rounded"
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
        className="cursor-pointer h-[33%] flex flex-col"
        onClick={() => router.push(`/news/${postId}`)}
      >
        <CardContent>
          <p className="line-clamp-3">{content}</p>
        </CardContent>
        <CardFooter className="mt-auto">
          <p className="flex items-center w-full">
            By {author?.name} - {dayjs(date).format("MMM DD, YYYY")}
            <ArrowRight size={20} className="ml-auto" />
          </p>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
