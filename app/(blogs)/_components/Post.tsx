'use client'

import FlexBetween from "@/components/FlexBetween";
import ProfileAvatar from "@/components/ProfileAvatar";
import SocialDropdown from "@/components/SocialDropdown";
import Stack from "@/components/Stack";
import { urlForImage } from "@/sanity/lib/image";
import { Author } from "@/types/author";
import { BlogPost } from "@/types/post";
import dayjs from "dayjs";
import PostBody from "./PostBody";
import DisqusComments from "@/components/DisqusComments";

interface PostProps {
  post: BlogPost;
  author: Author;
}

const Post = ({ author, post }: PostProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-8 flex flex-col gap-y-8">
        <h1 className="text-4xl font-bold md:text-5xl">{post.title}</h1>
        <Stack>
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
      </div>
      <PostBody post={post} author={author} />
      <DisqusComments post={post} />
    </div>
  );
};

export default Post;
