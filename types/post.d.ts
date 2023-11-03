export type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  status: string;
  categories: [number];
  author: number;
  content: { rendered: string };
  date: string;
  yoast_head_json: { og_image: [{ url: string }] };
  // uagb_excerpt: string;
  // uagb_author_info: { display_name: string };
  // uagb_featured_image_src: {
  //   full: string[];
  //   thumbnail: string[];
  //   medium: string[];
  //   large: string[];
  // };
  link: string;
  slug: string;
};
