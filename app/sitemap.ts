import { MetadataRoute } from "next";

const URL = "https://www.artistcastingexplorer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const newsPosts = [].map(({ id, date }) => ({
    url: `${URL}/news/${id}`,
    lastModified: date,
  }));

  const interviewsPosts = [].map(({ id, date }) => ({
    url: `${URL}/interviews/${id}`,
    lastModified: date,
  }));

  return [...newsPosts, ...interviewsPosts];
}
