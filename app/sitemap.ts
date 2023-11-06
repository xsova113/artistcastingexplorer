import { MetadataRoute } from "next";

const URL = "https://www.artistcastingexplorer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = [].map(({ id, date, slug }) => ({
    url: `${URL}/${slug}/${id}`,
    lastModified: date,
  }));

  return [...posts];
}
