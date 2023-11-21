import ArticleCard from "@/app/(blogs)/_components/ArticleCard";
import Stack from "@/components/Stack";
import { buttonVariants } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import Link from "next/link";

const InterviewSection = async () => {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "interviews"] | order(publishedAt desc)`,
    { cache: "no-store" },
  );

  if (!posts.length || !posts) return null;

  return (
    <Stack className="mb-28 mt-10 w-full items-center gap-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-semibold capitalize lg:text-4xl">
          Interview Articles
        </h1>
        <p className="text-center">Discover the latest stories here</p>
      </div>

      {!posts || posts.length === 0 ? (
        <p>Cannot load...</p>
      ) : (
        <div className="grid grid-cols-1 justify-center gap-4 lg:grid-cols-3">
          {posts.slice(0, 3).map((post: BlogPost) => (
            <ArticleCard key={post._id} path="interviews" post={post} />
          ))}
        </div>
      )}

      <Link
        href="/interviews"
        className={buttonVariants({
          className:
            "z-50 bg-secondary-foreground px-8 hover:bg-secondary-foreground/80",
        })}
      >
        View All
      </Link>
    </Stack>
  );
};

export default InterviewSection