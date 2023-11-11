import { MetadataRoute } from "next";

const url = "https://www.artistcastingexplorer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/subscribe"].map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date(),
  }));
  return [...routes];
}
