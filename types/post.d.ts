export type Post = {
  id: number;
  title: { rendered: string };
  categories: [number];
  author: number;
  content: { rendered: string };
  date: string;
  uagb_excerpt: string;
  uagb_author_info: { display_name: string };
  uagb_featured_image_src: {
    full: string[];
    thumbnail: string[];
    medium: string[];
    large: string[];
  };
};
