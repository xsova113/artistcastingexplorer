"use client";

import { Post } from "@/types/post";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetchBlog = () => {
  const [blogs, setBlogs] = useState<Post[]>();

  const fetchBlogs = async () => {
    await axios
      .get("https://castingjapanese.ca/wp-json/wp/v2/posts")
      .then((res) => setBlogs(res.data));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return blogs;
};

export default useFetchBlog;
