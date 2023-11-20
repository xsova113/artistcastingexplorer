import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import Archive from "../_components/Archive";
import MainPostCard from "../_components/MainPostCard";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import LatestArticles from "../_components/LatestArticles";

const currentYear = new Date().getFullYear();

export const revalidate = 0

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { month: string };
}) => {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "news"] | order(publishedAt desc)`, {cache: 'no-store'}
  );
  const latestPost: BlogPost = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "news"] | order(publishedAt desc)[0]`, {cache: 'no-store'}
  );

  const filteredPosts = !searchParams.month
    ? posts
    : posts.filter((post) =>
        dayjs(post.publishedAt).isSame(
          `${currentYear}-${searchParams.month}`,
          "month",
        ),
      );

  return (
    <section>
      <div className="mb-12 flex flex-col gap-y-4">
        <h1 className="text-4xl font-semibold md:text-5xl">
          News and Upcoming Events
        </h1>
        <h3 className="text-muted-foreground">
          Explore here for details on artist appearances and more
        </h3>
      </div>

      {!posts || !posts.length ? (
        <div className="flex items-center justify-center py-24 text-lg">
          No posts found.
        </div>
      ) : (
        <div className="flex flex-col gap-y-8">
          <MainPostCard path="news" post={latestPost} />

          <div className="flex justify-center gap-2">
            <LatestArticles posts={filteredPosts} path="news" />

            <div className="ml-auto flex max-sm:hidden">
              <Separator className="mx-4 mt-16 h-4/5" orientation="vertical" />
              <Archive posts={posts} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogPage;
