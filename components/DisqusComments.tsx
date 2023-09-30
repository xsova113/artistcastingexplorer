import { Post } from "@/types/post";
import { DiscussionEmbed } from "disqus-react";

const DisqusComments = ({ post }: { post: Post }) => {
  const shortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME as string;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const disqusConfig = {
    url: pageUrl,
    identifier: post.slug,
    title: post.title.rendered,
  };

  return <DiscussionEmbed shortname={shortname} config={disqusConfig} />;
};

export default DisqusComments;
