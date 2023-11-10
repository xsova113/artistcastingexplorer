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
      name: "role",
      type: "string",
      title: "Role",
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Location",
    }),
    defineField({
      name: "profileUrl",
      type: "string",
      title: "Profile URL",
    }),
    defineField({
      name: "imageUrl",
      type: "string",
      title: "Image URL",
    }),
  ],
});
