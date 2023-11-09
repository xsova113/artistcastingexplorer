import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import { Category } from "@/types/category";
import MainPostCard from "../_components/MainPostCard";
import { Separator } from "@/components/ui/separator";
import LatestArticles from "../_components/LatestArticles";
import InterviewArchive from "../_components/InterviewArchive";

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { category: string };
}) => {
  const posts: BlogPost[] = await client.fetch(
    searchParams.category
      ? `*[_type == 'post' && categories[] -> title match "${searchParams.category}" ]`
      : `*[_type == 'post' && categories[] -> title match "interviews" ]`,
  );

  const categories: Category[] = await client.fetch(`*[_type == 'category']`);

  return (
    <section>
      <div className="mb-12 flex flex-col gap-y-4">
        <h1 className="text-4xl font-semibold md:text-5xl">
          Interview Articles
        </h1>
        <h3 className="text-muted-foreground">
          Discover the latest stories here
        </h3>
      </div>

      <div className="flex flex-col gap-y-8">
        <MainPostCard path="interviews1" post={posts[0]} />

        <div className="flex gap-2">
          <LatestArticles posts={posts} categories={categories} />

          <div className="ml-auto flex max-sm:hidden">
            <Separator className="mx-4 mt-16 h-4/5" orientation="vertical" />
            <InterviewArchive categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
