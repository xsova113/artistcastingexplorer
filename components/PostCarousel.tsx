// @ts-nocheck

"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import axios from "axios";
import { Category, Slug } from "@/types/category";

const PostCarousel = ({ categorySlug }: { categorySlug: Slug }) => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 640px)");
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/posts",
      );

      setPosts(response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://castingjapanese.ca/wp-json/wp/v2/categories",
      );

      setCategories(response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.categories.includes(
      categories.find((category) => category.slug === categorySlug)!.id,
    ),
  );

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <section className="mb-20 flex w-full flex-col">
      <h1 className="mb-10 self-center text-3xl font-semibold md:text-4xl">
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
        {filteredPosts.map((post) => (
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
