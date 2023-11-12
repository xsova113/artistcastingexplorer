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
  const posts: BlogPost[] = await client.fetch(`*[_type == 'post']`);
  const routes = pathnames.map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${url}/${post.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
  }));

  return [...routes, ...blogRoutes];
}
