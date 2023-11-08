export type Author = {
  _rev: string;
  _type: string;
  bio: Bio[];
  _id: string;
  slug: Slug;
  _createdAt: Date;
  name: string;
  _updatedAt: Date;
  image: Image;
};

export type Bio = {
  style: string;
  _key: string;
  markDefs: any[];
  children: Child[];
  _type: string;
};

export type Child = {
  _type: string;
  marks: string[];
  text: string;
  _key: string;
};

export type Image = {
  _type: string;
  asset: Asset;
};

export type Asset = {
  _type: string;
  _ref: string;
};

export type Slug = {
  current: string;
  _type: string;
};

// Converts JSON strings to/from your types
export class Convert {
  public static toAuthor(json: string): Author {
    return JSON.parse(json);
  }

  public static authorToJson(value: Author): string {
    return JSON.stringify(value);
  }
}
