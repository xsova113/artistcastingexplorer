export type News = {
  id: number;
  title: { rendered: string };
  date: string;
  uagb_author_info: { display_name: string };
  uagb_featured_image_src: {
    full: string[];
    thumbnail: string[];
    medium: string[];
    large: string[];
  };
}[];
