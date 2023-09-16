"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import axios from "axios";

const PostCarousel = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 640px)");
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/posts"
      );

      setPosts(response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="w-full flex flex-col mb-20">
      <h1 className="self-center font-semibold text-3xl md:text-4xl mb-10">
        Related Articles
      </h1>

      <Slider
        dots
        nextArrow={<ChevronRight color="black" size={30} />}
        prevArrow={<ChevronLeft color="black" size={30} />}
        appendDots={(dots) => (
          <div>
            <ul style={{ WebkitTextFillColor: "black" }}>{dots}</ul>
          </div>
        )}
        infinite
        slidesToScroll={1}
        slidesToShow={isAboveMediumScreen ? 2 : 1}
      >
        {posts.map((post) => (
          <PostCard
            authorId={post.author}
            content={post.uagb_excerpt}
            date={post.date}
            title={post.title.rendered}
            featuredImage={post.uagb_featured_image_src.medium[0]}
            key={post.id}
            postId={post.id}
          />
        ))}
      </Slider>
    </section>
  );
};

export default PostCarousel;
