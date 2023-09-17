export type Slug = "news" | "interview" | "uncategorized";

export type Category = {
  id: number;
  count: number;
  name: string;
  slug: Slug;
};
