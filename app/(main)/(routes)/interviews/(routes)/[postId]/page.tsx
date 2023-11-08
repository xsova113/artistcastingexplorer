import PostCarousel from "@/components/PostCarousel";
import BlogPost from "@/components/Post";
import NewsletterSection from "@/components/NewsletterSection";

interface NewsPostPageProps {
  params: { postId: string };
}

const InterviewPostPage = ({ params }: NewsPostPageProps) => {
  return (
    <div className="mx-auto max-w-screen-xl px-6 md:px-28">
      <Post postId={params.postId} />
      <PostCarousel categorySlug={"interview"} />
      <NewsletterSection />
    </div>
  );
};

export default InterviewPostPage;
