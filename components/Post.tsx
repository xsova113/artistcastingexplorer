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

interface NewPostProps {
  postId: string;
}

const Post = ({ postId }: NewPostProps) => {
  const fetchPost = async () => {
    const response = await axios.get(
      `https://castingjapanese.ca/wp-json/wp/v2/posts/${postId}`
    );

    return response.data;
  };

  const {
    data: post,
    error: postError,
    isLoading: isPostLoading,
  } = useQuery<Post, Error>("post", fetchPost);

  const fetchAuthor = async () => {
    const response = await axios.get(
      `https://castingjapanese.ca/wp-json/wp/v2/users/${post?.author}`
    );
    return response.data;
  };

  const {
    data: author,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery<WPUser, Error>("author", fetchAuthor);

  return (
    <section className="py-20 items-center">
      <YProgressBar />
      {postError || userError ? (
        <span>Oh no, there was an error</span>
      ) : isPostLoading || isUserLoading || !post ? (
        <div className="w-full flex justify-center gap-4 text-2xl items-center">
          Loading...
          <Loader2 className="animate-spin" size={50} />
        </div>
      ) : (
        <Stack>
          <h1 className="md:text-6xl text-4xl self-start font-medium mb-4 md:mb-12">
            {post?.title.rendered}
          </h1>
          <FlexBetween className="mb-8">
            <span className="text-muted-foreground">
              {dayjs(post?.date).format("MMM DD, YYYY")}
            </span>
            <SocialDropdown />
          </FlexBetween>
          <div className="flex items-start gap-2 mb-10">
            <ProfileAvatar
              image={post ? post.uagb_featured_image_src.thumbnail[0] : ""}
            />
            <div className="flex flex-col">
              <h3>{post.uagb_author_info.display_name}</h3>
              <p className="text-muted-foreground text-xs md:w-1/2">
                {author?.description}
              </p>
            </div>
          </div>
          <Stack className="w-11/12 mx-auto gap-8 mb-10">
            <div className="relative w-full h-[450px]">
              <Image
                src={post.uagb_featured_image_src.full[0]}
                alt={"featured image"}
                fill
                className="object-cover rounded"
              />
            </div>
            <p>{post.uagb_excerpt}</p>
          </Stack>
        </Stack>
      )}
    </section>
  );
};

export default Post;
