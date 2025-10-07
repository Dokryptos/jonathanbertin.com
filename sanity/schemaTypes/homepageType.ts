import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: ImageIcon,
  orderings: [orderRankOrdering],
  fieldsets: [
    {
      name: "misc",
      title: "Misc",
      options: {
        columns: 3,
      },
    },
  ],
  fields: [
    orderRankField({ type: "homepage" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the project (not an obligation)",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the homepage`),

      description:
        "The image use for the presentation Homepage animation (Obligation)",
    }),
  ],
});
