import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface ArticleCardProps {
  title: string;
  author: string;
  image: string;
  postId: number;
  path: "news" | "interviews";
  date: string;
  content: string;
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
  return (
    <Link href={`/${path}/${postId}`}>
      <Card className="flex h-[400px] w-[330px] flex-col border-none shadow-none drop-shadow">
        <div className={cn("relative h-full w-full", !image && "hidden")}>
          <Image
            src={image}
            alt={"featured image"}
            fill
            className="rounded-t-lg object-cover"
            loading="lazy"
          />
        </div>
        <div className="mt-auto">
          <CardHeader className="-mt-2 pb-2">
            <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            <p className="line-clamp-3 text-sm text-muted-foreground">{content}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm">{author}</p>
              <span className="text-xs">
                {format(new Date(date), "MMMM dd, yyyy")}
              </span>
            </div>
            <Link
              href={`/${path}/${postId}`}
              className="flex items-center text-sm font-bold underline-offset-4 hover:underline"
            >
              Read More <ChevronRight className="ml-2" size={18} />
            </Link>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
