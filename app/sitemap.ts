import useFetchBlog from "@/hooks/useFetchBlog";
import { MetadataRoute } from "next";
import { notFound } from "next/navigation";

const URL = "https://www.artistcastingexplorer.com";

// const news = async () => {
//    const posts = (await axios.get("https://castingjapanese.ca/wp-json/wp/v2/posts")).data;
//   return posts
// };

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = useFetchBlog();
  if (!blogs?.length) notFound();
  
  const posts = blogs.map(({ id, slug, date }) => ({
    url: `${URL}/${slug}/${id}`,
  }));

  //   const interviewsPosts = [].map(({ id, date }) => ({
  //     url: `${URL}/interviews/${id}`,
  //     lastModified: date,
  //   }));

  return [...posts];
}
