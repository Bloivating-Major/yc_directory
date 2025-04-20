import { defineField, defineType } from "sanity";

export const playlist = defineType({
  name: "playlist",
  title: "Playlist",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "select",
      title: "Selected Startups",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "startup" }],
        },
      ],
    }),
  ],
});
