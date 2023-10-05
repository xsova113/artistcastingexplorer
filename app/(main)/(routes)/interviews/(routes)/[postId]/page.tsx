import PostCarousel from "@/components/PostCarousel";
import Post from "../../../../../../components/Post";

interface NewsPostPageProps {
  params: { postId: string };
}

const InterviewPostPage = ({ params }: NewsPostPageProps) => {
  return (
    <div className="max-w-screen-xl mx-auto md:px-28 px-6">
      <Post postId={params.postId} />
      <PostCarousel />
    </div>
  );
};

export default InterviewPostPage;
