import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import ArticleCard from "../_components/ArticleCard";
import MainPostCard from "../_components/MainPostCard";
import { Separator } from "@/components/ui/separator";
import Archive from "../_components/Archive";

const BlogPage = async () => {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "interviews"]`,
  );

  return (
    <section className="mx-auto max-w-screen-lg px-2.5 py-20 md:px-10">
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
          <div className="flex flex-col gap-y-6">
            <h2 className="text-3xl font-semibold">Latest Interviews</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {posts.slice(1).map((post) => (
                <ArticleCard path="news1" post={post} key={post._id} />
              ))}
            </div>
          </div>

          <div className="ml-auto flex">
            <Separator className="mx-4 mt-16 h-4/5" orientation="vertical" />
            <Archive posts={posts} />
          </div>
        </div>
      </div>

      {/* <div className="mt-20 flex flex-col items-center gap-y-6">
        <h1 className="text-3xl font-semibold">Related Articles</h1>
      </div> */}
    </section>
  );
};

export default BlogPage;
