import { createSlug } from "@/lib/helper";
import Link from "next/link";

const TagCard = ({
  tag,
  absoluteTop,
}: {
  tag?: string;
  absoluteTop?: boolean;
}) => {
  return (
    <Link
      href={`/blog/category/${createSlug(tag ? tag : "undefined")}`}
      className={
        "py-3 px-4 bg-primary-500 font-bold text-slate-600 text-[0.8rem] inline-block rounded-md " +
        `${absoluteTop ? "absolute z-[1000]" : ""}`
      }
    >
      {tag}
    </Link>
  );
};

export default TagCard;
