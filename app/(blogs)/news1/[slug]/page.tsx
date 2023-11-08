import { client } from "@/sanity/lib/client";
import PostBody from "../_components/PostBody";
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
    <div className="mx-auto flex max-w-screen-xl justify-center px-2.5 py-20 md:px-10">
      <YProgressBar />

      <div className="flex flex-col gap-y-8">
        <h1 className="text-4xl font-bold md:text-5xl">{post.title}</h1>

        <Stack className="gap-y-4">
          <FlexBetween>
            <span className="text-muted-foreground">
              {dayjs(post._createdAt).format("MMM DD, YYYY")}
            </span>
            <SocialDropdown />
          </FlexBetween>
          <div className="mb-4 flex items-center gap-2">
            <ProfileAvatar image={urlForImage(author.image).toString()} />
            <div className="flex flex-col">
              <h3>{author.name}</h3>
            </div>
          </div>
        </Stack>

        <PostBody post={post} author={author} />
      </div>
    </div>
  );
};

export default PostPage;
