import ArticleCard from "@/components/ArticleCard";
import Stack from "@/components/Stack";
import { buttonVariants } from "@/components/ui/button";
import { Category } from "@/types/category";
import { Post } from "@/types/post";
import axios from "axios";
import { compareDesc } from "date-fns";
import Link from "next/link";

const NewSection = async () => {
  const { data: posts } = await axios.get(
    "https://castingjapanese.ca/wp-json/wp/v2/posts",
  );

  const { data: categories } = await axios.get(
    "https://castingjapanese.ca/wp-json/wp/v2/categories",
  );

  const newsCategory: Category = categories.find(
    (category: Category) => category.slug === "news",
  );

  const newsPosts = posts.filter((post: Post) =>
    post.categories.includes(newsCategory.id),
  );

  const latestNewsPosts = newsPosts.sort((a: Post, b: Post) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <Stack className="mb-28 mt-10 w-full items-center gap-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-semibold capitalize text-center lg:text-4xl">
          News and Upcoming events
        </h1>
        <p className="text-center">
          Explore here for details on artist appearances and more
        </p>
      </div>

      {!posts || posts.length === 0 ? (
        <p>Cannot load...</p>
      ) : (
        <div className="flex flex-col justify-center gap-4 lg:flex-row">
          {latestNewsPosts.slice(0, 3).map((post: Post) => (
            <ArticleCard
              key={post.id}
              title={post.title.rendered}
              author={post.uagb_author_info.display_name}
              image={post.uagb_featured_image_src.large[0]}
              postId={post.id}
              path={"news"}
              date={post.date}
              content={post.uagb_excerpt}
            />
          ))}
        </div>
      )}
      <Link
        href="/news"
        className={buttonVariants({
          className:
            "bg-secondary-foreground px-8 hover:bg-secondary-foreground/80",
        })}
      >
        View All
      </Link>
    </Stack>
  );
};

export default NewSection;
