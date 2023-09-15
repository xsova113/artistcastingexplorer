import PostCarousel from "@/components/PostCarousel";
import Post from "../../../../../../components/Post";

interface NewsPostPageProps {
  params: { postId: string };
}

const NewsPostPage = ({ params }: NewsPostPageProps) => {
  return (
    <div className="max-w-screen-xl mx-auto md:px-28 px-6">
      <Post postId={params.postId} />
      <PostCarousel />
    </div>
  );
};

export default NewsPostPage;
