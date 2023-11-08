import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import ArticleCard from "../_components/ArticleCard";

const BlogPage = async () => {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "interviews"]`,
  );

  return (
    <section className="max-w-screen-lg px-2.5 py-20 md:px-10">
      {posts.map((post) => (
        // <div key={post._id}>
        //   <Link href={`/news1/${post.slug.current}`}>{post.slug.current}</Link>
        // </div>
        <ArticleCard path="interviews1" post={post} key={post._id} />
      ))}
    </section>
  );
};

export default BlogPage;
