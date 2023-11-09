import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import Archive from "../_components/Archive";
import MainPostCard from "../_components/MainPostCard";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import LatestArticles from "../_components/LatestArticles";

const currentYear = new Date().getFullYear();

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { month: string };
}) => {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "news"] | order(_createdAt desc)`,
  );
  const latestPost: BlogPost = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "news"] | order(_createdAt desc)[0]`,
  );

  const filteredPosts = !searchParams.month
    ? posts
    : posts.filter((post) =>
        dayjs(post._createdAt).isSame(
          `${currentYear}-${searchParams.month}`,
          "month",
        ),
      );

  return (
    <section className="mx-auto max-w-screen-lg px-2.5 py-20 md:px-10">
      <div className="mb-12 flex flex-col gap-y-4">
        <h1 className="text-4xl font-semibold md:text-5xl">
          News and Upcoming Events
        </h1>
        <h3 className="text-muted-foreground">
          Explore here for details on artist appearances and more
        </h3>
      </div>
      <div className="flex flex-col gap-y-8">
        <MainPostCard path="news1" post={latestPost} />

        <div className="flex gap-2">
          <LatestArticles posts={filteredPosts} />

          <div className="ml-auto flex max-sm:hidden">
            <Separator className="mx-4 mt-16 h-4/5" orientation="vertical" />
            <Archive posts={posts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
