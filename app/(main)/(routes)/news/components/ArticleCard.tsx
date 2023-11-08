import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WPUser } from "@/types/wpUser";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface ArticleCardProps {
  title: string;
  image: string;
  postId: number;
  authorId: number;
}

const ArticleCard = ({ title, authorId, image, postId }: ArticleCardProps) => {
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

  return (
    <Link href={`/news/${postId}`}>
      <Card className="border-none shadow-none drop-shadow">
        <div className="relative h-[180px] w-[250px]">
          <Image
            src={image}
            alt={"featured image"}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{author?.name}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
