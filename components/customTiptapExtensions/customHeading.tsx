import { mergeAttributes } from "@tiptap/core";
import Heading from "@tiptap/extension-heading";

const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    const classes =
      level === 1 ? "text-5xl font-bold" : "text-2xl font-semibold";

    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, { class: classes }),
      0,
    ];
  },
});

export default CustomHeading;
