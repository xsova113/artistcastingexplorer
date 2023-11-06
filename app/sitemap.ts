import { Post } from "@/types/post";
import axios from "axios";
import { MetadataRoute } from "next";

const URL = "https://www.artistcastingexplorer.com";

const news = async (): Promise<Post[]> => {
  const posts = (
    await axios.get("https://castingjapanese.ca/wp-json/wp/v2/posts")
  ).data;

  return posts;
};

export default async function sitemap() {
  const posts = await news().then((data) =>
    data.map(({ id, slug, date }) => ({
      url: `${URL}/${slug}/${id}`,
      lastModified: date,
    })),
  );

  return [...posts];
}
