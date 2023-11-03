"use client";

import FlexBetween from "@/components/FlexBetween";
import Stack from "@/components/Stack";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import SocialDropdown from "./SocialDropdown";
import YProgressBar from "./YProgressBar";
import ProfileAvatar from "./ProfileAvatar";
import axios from "axios";
import { useQuery } from "react-query";
import { WPUser } from "@/types/wpUser";
import { Post } from "@/types/post";
import { useCallback, useEffect, useState } from "react";
import DisqusComments from "./DisqusComments";

interface NewPostProps {
  postId: string;
}

const Post = ({ postId }: NewPostProps) => {
  const [author, setAuthor] = useState<WPUser>();

  const fetchPost = async () => {
    const response = await axios.get(
      `https://castingjapanese.ca/wp-json/wp/v2/posts/${postId}`,
    );

    return response.data;
  };

  const {
    data: post,
    error: postError,
    isLoading: isPostLoading,
  } = useQuery<Post, Error>("post", fetchPost);

  const fetchAuthor = useCallback(async () => {
    const response = await axios.get(
      `https://castingjapanese.ca/wp-json/wp/v2/users/${post?.author}`,
    );
    setAuthor(response.data);
    return response.data;
  }, [post]);

  useEffect(() => {
    fetchAuthor();
  }, [fetchAuthor]);

  return (
    <section
    // className="items-center py-20"
    >
      <YProgressBar />
      {postError ? (
        <span>Oh no, there was an error</span>
      ) : isPostLoading || !post ? (
        <div className="flex w-full items-center justify-center gap-4 text-2xl">
          Loading...
          <Loader2 className="animate-spin" size={50} />
        </div>
      ) : (
        <section>
          <Stack>
            <h1 className="mb-4 self-start text-4xl font-medium md:mb-12 md:text-6xl">
              {post?.title.rendered}
            </h1>
            <FlexBetween className="mb-8">
              <span className="text-muted-foreground">
                {dayjs(post?.date).format("MMM DD, YYYY")}
              </span>
              <SocialDropdown />
            </FlexBetween>
            <div className="mb-10 flex items-start gap-2">
              <ProfileAvatar image={author ? author.avatar_urls[96] : ""} />
              <div className="flex flex-col">
                <h3>{author?.name}</h3>
                <p className="text-xs text-muted-foreground md:w-1/2">
                  {author?.description}
                </p>
              </div>
            </div>
          </Stack>

          <article
            dangerouslySetInnerHTML={{
              __html: post.content.rendered.replaceAll(
                "wp-block-columns-is-layout-flex",
                "md:flex-row flex-col flex mt-4 gap-10",
              ),
            }}
            className="mb-24 text-muted-foreground"
          />
          {/* <iframe src={post.link} className="min-h-screen min-w-full" /> */}
          <DisqusComments post={post} />
        </section>
      )}
    </section>
  );
};

export default Post;
