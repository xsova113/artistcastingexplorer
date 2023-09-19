"use client";

import FlexBetween from "@/components/FlexBetween";
import Stack from "@/components/Stack";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import SocialDropdown from "./SocialDropdown";
import YProgressBar from "./YProgressBar";
import ProfileAvatar from "./ProfileAvatar";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import { WPUser } from "@/types/wpUser";
import { Post } from "@/types/post";
import { cn } from "@/lib/utils";

interface NewPostProps {
  postId: string;
}

const Post = ({ postId }: NewPostProps) => {
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

  const fetchAuthor = async () => {
    if (!post) return;

    const response = await axios.get(
      `https://castingjapanese.ca/wp-json/wp/v2/users/${post.author}`,
    );
    return response.data;
  };

  const {
    data: author,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery<WPUser, Error>("author", fetchAuthor);

  return (
    <section className="items-center py-20">
      <YProgressBar />
      {postError || userError ? (
        <span>Oh no, there was an error</span>
      ) : isPostLoading || isUserLoading || !post ? (
        <div className="flex w-full items-center justify-center gap-4 text-2xl">
          Loading...
          <Loader2 className="animate-spin" size={50} />
        </div>
      ) : (
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
            <ProfileAvatar
              image={post ? post.uagb_featured_image_src.thumbnail[0] : ""}
            />
            <div className="flex flex-col">
              <h3>{post.uagb_author_info.display_name}</h3>
              <p className="text-xs text-muted-foreground md:w-1/2">
                {author?.description}
              </p>
            </div>
          </div>
          {/* <Stack className="mx-auto mb-10 w-11/12 gap-8">
            <div
              className={cn(
                "relative h-[450px] w-full",
                !post.uagb_featured_image_src.thumbnail && "hidden",
              )}
            >
              <Image
                src={post.uagb_featured_image_src.full[1]}
                alt={"featured image"}
                fill
                className="rounded object-cover"
              />
            </div>
            <p>{post.uagb_excerpt}</p>
          </Stack> */}
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </Stack>
      )}
    </section>
  );
};

export default Post;
