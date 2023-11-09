export type Slug = "news" | "interview" | "uncategorized";

export type Category_old = {
  id: number;
  count: number;
  name: string;
  slug: Slug;
};

export type Category = {
  title:       string;
  _updatedAt:  Date;
  _createdAt:  Date;
  _rev:        string;
  _type:       string;
  description: string;
  _id:         string;
}

