import { defineField, defineType } from "sanity";

export default defineType({
  name: "relatedArtist",
  type: "document",
  title: "Related Artist",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "profileUrl",
      type: "string",
      title: "Profile URL",
    }),
  ],
});
