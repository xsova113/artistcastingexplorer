import PostCarousel from "@/components/PostCarousel";
import NewsletterSection from "@/components/NewsletterSection";
import Post from "@/components/Post";

interface NewsPostPageProps {
  params: { postId: string };
}

const NewsPostPage = ({ params }: NewsPostPageProps) => {
  return (
    <div className="mx-auto max-w-screen-xl px-6 md:px-28">
      <Post postId={params.postId} />
      <PostCarousel categorySlug={"uncategorized"} />
      <NewsletterSection />
    </div>
  );
};

export default NewsPostPage;
