import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import ArticleCard from "../_components/ArticleCard";
import Archive from "../_components/Archive";

export const revalidate = 0;

const BlogPage = async () => {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "news"]`,
  );

  return (
    <section className="max-w-screen-lg px-2.5 py-20 md:px-10">
      <div className="mb-12 flex flex-col gap-y-4">
        <h1 className="text-4xl font-semibold md:text-5xl">
          News and Upcoming Events
        </h1>
        <h3 className="text-muted-foreground">
          Explore here for details on artist appearances and more
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          // <div key={post._id}>
          //   <Link href={`/news1/${post.slug.current}`}>{post.slug.current}</Link>
          // </div>
          <ArticleCard path="news1" post={post} key={post._id} />
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-y-6">
        <h1 className="text-3xl font-semibold">Related Articles</h1>
        <Archive posts={posts} />
      </div>
    </section>
  );
};

export default BlogPage;
