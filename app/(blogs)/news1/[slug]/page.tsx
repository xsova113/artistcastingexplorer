import { client } from "@/sanity/lib/client";
import PostBody from "../../_components/PostBody";
import { BlogPost } from "@/types/post";
import { Author } from "@/types/author";
import { notFound } from "next/navigation";
import ProfileAvatar from "@/components/ProfileAvatar";
import SocialDropdown from "@/components/SocialDropdown";
import FlexBetween from "@/components/FlexBetween";
import dayjs from "dayjs";
import { urlForImage } from "@/sanity/lib/image";
import Stack from "@/components/Stack";
import YProgressBar from "@/components/YProgressBar";
import Post from "../../_components/Post";
import NewsletterSection from "@/components/NewsletterSection";

interface PostPageProps {
  params: { slug: string };
}

const PostPage = async ({ params }: PostPageProps) => {
  const post: BlogPost = await client.fetch(
    `*[_type == 'post' && slug.current == '${params.slug}'][0]`,
  );
  const author: Author = await client.fetch(
    `*[_type == 'author' && _id == "${post.author?._ref}"][0]`,
  );

  if (!post) notFound();

  return (
    <>
      <YProgressBar />
      <Post author={author} post={post} />
      <NewsletterSection />
    </>
  );
};

export default PostPage;
