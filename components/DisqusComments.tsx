import { BlogPost } from "@/types/post";
import { DiscussionEmbed } from "disqus-react";

const DisqusComments = ({ post }: { post: BlogPost }) => {
  const shortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME as string;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const disqusConfig = {
    url: pageUrl,
    identifier: post.slug.current,
    title: post.title,
  };

  return <DiscussionEmbed shortname={shortname} config={disqusConfig} />;
};

export default DisqusComments;
