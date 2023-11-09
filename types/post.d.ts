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

export type RelatedArtist = {
  _ref:                 string;
  _type:                string;
  _strengthenOnPublish: StrengthenOnPublish;
  _key:                 string;
  _weak:                boolean;
}

export type StrengthenOnPublish = {
  type:     string;
  template: Template;
}

export type Template = {
  id: string;
}

export type BlogPost = {
  author:         Author;
  _type:          string;
  description:    string;
  body:           Body[];
  mainImage:      MainImage;
  slug:           Slug;
  _rev:           string;
  title:          string;
  _createdAt:     Date;
  _id:            string;
  categories:     Category[];
  relatedArtists: RelatedArtist[];
  _updatedAt:     Date;
}

export type Author = {
  _ref:  string;
  _type: string;
}

export type Body = {
  _type:     string;
  _key:      string;
  url?:      string;
  markDefs?: any[];
  children?: Child[];
  style?:    string;
}

export type Child = {
  _type: string;
  marks: any[];
  text:  string;
  _key:  string;
}

export type Category = {
  _type: string;
  _key:  string;
  _ref:  string;
}

export type MainImage = {
  asset: Author;
  _type: string;
  alt:   string;
}

export type RelatedArtist = {
  _weak:                boolean;
  _ref:                 string;
  _type:                string;
  _strengthenOnPublish: StrengthenOnPublish;
  _key:                 string;
}

export type StrengthenOnPublish = {
  template: Template;
  type:     string;
}

export type Template = {
  id: string;
}

export type Slug = {
  current: string;
  _type:   string;
}
