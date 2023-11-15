import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import { MetadataRoute } from "next";

const url = "https://www.artistcastingexplorer.com";
const pathnames = [
  "/",
  "/directory",
  "/news",
  "/interviews",
  "/subscribe",
  "/contact",
  "/about",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsPosts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "news"] | order(publishedAt desc)`,
  );

  const interviewsPosts: BlogPost[] = await client.fetch(
    `*[_type == 'post' && categories[] -> title match "interviews"] | order(publishedAt desc)`,
  );

  const routes = pathnames.map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
  }));

  const newsRoutes = newsPosts.map((post) => ({
    url: `${url}/news/${post.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
  }));

  const interviewsRoutes = interviewsPosts.map((post) => ({
    url: `${url}/interviews/${post.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
  }));

  return [...routes, ...newsRoutes, ...interviewsRoutes];
}
