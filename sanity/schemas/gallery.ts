import { defineField, defineType } from "sanity";

export default defineType({
  name: "inlineImage",
  type: "document",
  title: "Inline Image",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
  ],
  options: {
    layout: "grid",
  },
});

// export default defineType({
//   name: "inlineImage",
//   type: "image",
//   title: "Inline Image",
//   options: { hotspot: true },
//   fields: [
//     {
//       name: "caption",
//       type: "string",
//       title: "Caption",
//     },
//     {
//       name: "alt",
//       type: "string",
//       title: "Alternative Text",
//     },
//   ],
// });
