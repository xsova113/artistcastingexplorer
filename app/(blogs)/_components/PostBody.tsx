"use client";

import ReactPlayer from "react-player";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { BlogPost } from "@/types/post";
import { Author } from "@/types/author";
import { useEffect, useState } from "react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Raleway } from "next/font/google";

interface PostBodyProps {
  post: BlogPost;
  author?: Author;
}

const PostBody = ({ post }: PostBodyProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 640px)");

  const ptComponents: PortableTextComponents = {
    types: {
      image: ({ value, isInline }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={value.alt || ""}
            loading="lazy"
            src={urlForImage(value)
              .fit("max")
              .width(isInline ? 100 : 800)
              .auto("format")
              .toString()}
            className="my-6"
          />
        );
      },
      youtube: ({ value }) => {
        const { url } = value;
        return (
          <ReactPlayer
            url={url}
            height={isLargeScreen ? 315 : 250}
            width={isLargeScreen ? 500 : 360}
          />
        );
      },
    },
    marks: {
      em: ({ children }) => (
        <em className="font-semibold text-gray-600">{children}</em>
      ),
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "_blank" : "noindex nofollow"}
            className="underline"
          >
            {children}
          </a>
        );
      },
    },
    block: {
      h2: ({ children }: any) => {
        if (children.length === 1 && children[0] === "") {
          return <br />;
        }
        return (
          <h2 className="text-3xl font-bold text-black md:text-4xl">
            {children}
          </h2>
        );
      },
      normal: ({ children }: any) => {
        if (children.length === 1 && children[0] === "") {
          return <br />;
        }
        return <p>{children}</p>;
      },
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <PortableText value={post.body} components={ptComponents} />;
};

export default PostBody;
