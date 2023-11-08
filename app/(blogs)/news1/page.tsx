import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import Link from "next/link";

const BlogPage = async () => {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "news"]`,
  );

  return (
    <section className="max-w-screen-lg px-2.5 py-20 md:px-10">
      {posts.map((post) => (
        <div key={post._id}>
          <Link href={`/news1/${post.slug.current}`}>{post.slug.current}</Link>
        </div>
      ))}
    </section>
  );
};

export default BlogPage;
