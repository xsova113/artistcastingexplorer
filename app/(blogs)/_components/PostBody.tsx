"use client";

import ReactPlayer from "react-player";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { BlogPost } from "@/types/post";
import { Author } from "@/types/author";
import { useEffect, useState } from "react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";

interface PostBodyProps {
  post: BlogPost;
  author?: Author;
}

const PostBody = ({ post }: PostBodyProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 640px)");

  const ptComponents: PortableTextComponents = {
    types: {
      image: ({ value }) => {
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
              .width(650)
              .height(400)
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
            height={isLargeScreen ? 340 : 250}
            width={isLargeScreen ? 640 : 375}
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
      h1: ({ children }: any) => {
        if (children.length === 1 && children[0] === "") {
          return <br />;
        }
        return (
          <h3 className="text-4xl font-semibold text-black md:text-5xl">
            {children}
          </h3>
        );
      },
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
      h3: ({ children }: any) => {
        if (children.length === 1 && children[0] === "") {
          return <br />;
        }
        return (
          <h3 className="text-xl font-semibold text-black md:text-2xl">
            {children}
          </h3>
        );
      },
      h4: ({ children }: any) => {
        if (children.length === 1 && children[0] === "") {
          return <br />;
        }
        return (
          <h4 className="text-lg font-semibold text-black md:text-xl">
            {children}
          </h4>
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
