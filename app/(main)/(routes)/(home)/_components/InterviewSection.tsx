import ArticleCard from "@/components/ArticleCard";
import Stack from "@/components/Stack";
import { buttonVariants } from "@/components/ui/button";
import { Category_old } from "@/types/category";
import { Post } from "@/types/post";
import axios from "axios";
import { compareDesc } from "date-fns";
import Link from "next/link";

const InterviewSection = async () => {
  const { data: posts } = await axios.get(
    "https://castingjapanese.ca/wp-json/wp/v2/posts",
  );

  const { data: categories } = await axios.get(
    "https://castingjapanese.ca/wp-json/wp/v2/categories",
  );

  const interviewCategory: Category_old = categories.find(
    (category: Category_old) => category.slug === "interview",
  );

  const interviewPosts = posts.filter((post: Post) =>
    post.categories.includes(interviewCategory.id),
  );

  const latestInterviewPosts = interviewPosts.sort((a: Post, b: Post) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

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
          {latestInterviewPosts.slice(0, 3).map((post: Post) => (
            <ArticleCard
              key={post.id}
              title={post.title.rendered}
              image={post.yoast_head_json.og_image[0].url}
              authorId={post.author}
              postId={post.id}
              path={"interviews"}
              date={post.date}
              content={post.excerpt.rendered}
            />
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

export default InterviewSection;
