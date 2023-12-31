import ProfileAvatar from "@/components/ProfileAvatar";
import { urlForImage } from "@/sanity/lib/image";
import { BlogPost } from "@/types/post";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MainPostCardProps {
  path: "news" | "interviews" | "news1" | "interviews1";
  post: BlogPost;
  author: any;
}
const MainPostCard = ({ path, post, author }: MainPostCardProps) => {
  return (
    <Link
      href={`/${path}/${post.slug.current}`}
      className="relative grid w-full grid-cols-1 gap-2.5 overflow-clip rounded-xl border shadow max-md:h-[680px] md:grid-cols-2 md:items-center"
    >
      <div className="relative h-96 w-full">
        <Image
          fill
          src={urlForImage(post.mainImage).toString()}
          alt={post.slug.toString()}
          loading="eager"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-4 p-4 md:px-10">
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
            {format(
              new Date(post?.publishedAt ? post.publishedAt : post._createdAt),
              "MMMM dd, yyyy",
            )}
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
