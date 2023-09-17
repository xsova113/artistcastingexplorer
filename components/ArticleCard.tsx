import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  author: string;
  image: string;
  postId: number;
  path: "news" | "interviews";
}

const ArticleCard = ({
  title,
  author,
  image,
  postId,
  path,
}: ArticleCardProps) => {
  return (
    <Link href={`/${path}/${postId}`}>
      <Card className="border-none shadow-none drop-shadow">
        <div className="relative w-[250px] h-[180px]">
          <Image
            src={image}
            alt={"featured image"}
            fill
            className="object-cover rounded-t-lg"
            loading="lazy"
          />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{author}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
