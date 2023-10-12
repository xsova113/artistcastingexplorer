import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

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
      <Card className="flex h-[370px] w-[330px] flex-col border-none shadow-none drop-shadow">
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
            <p className="line-clamp-4 text-muted-foreground">{content}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm">{author}</p>
              <span className="text-xs">
                {format(new Date(date), "MMMM dd, yyyy")}
              </span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
