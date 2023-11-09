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
  link: string;
  slug: string;
};

export type BlogPost = {
  _createdAt: Date;
  _rev: string;
  categories: Category[];
  body: Body[];
  title: string;
  description: string;
  mainImage: MainImage;
  _type: string;
  _id: string;
  _updatedAt: Date;
  slug: Slug;
  author: Author;
};

export type Author = {
  _ref: string;
  _type: string;
};

export type Body = {
  markDefs?: MarkDef[];
  children?: Child[];
  _type: string;
  style?: string;
  _key: string;
  url?: string;
  asset?: Author;
};

export type Child = {
  marks: string[];
  text: string;
  _key: string;
  _type: string;
};

export type MarkDef = {
  _key: string;
  _type: string;
  href: string;
};

export type Category = {
  description: string;
  _id: string;
  title: string;
  _updatedAt: Date;
  _createdAt: Date;
  _rev: string;
  _type: string;
};

export type MainImage = {
  _type: string;
  alt: string;
  asset: Author;
};

export type Slug = {
  current: string;
  _type: string;
};

// Converts JSON strings to/from your types
export class Convert {
  public static toBlogPost(json: string): BlogPost {
    return JSON.parse(json);
  }

  public static blogPostToJson(value: BlogPost): string {
    return JSON.stringify(value);
  }
}
