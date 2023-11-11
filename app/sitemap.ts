import { MetadataRoute } from "next";

const url = "https://www.artistcastingexplorer.com";
const pathnames = [
  "/",
  "directory",
  "/news",
  "/interviews",
  "/subscribe",
  "contact",
  "about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = pathnames.map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date(),
  }));
  return [...routes];
}
