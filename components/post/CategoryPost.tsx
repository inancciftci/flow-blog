import Image from "next/image";
import React from "react";
import TagCard from "../ui/tagcard";
import { getShortDescription } from "@/lib/helper";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/20/solid";

const CategoryPost = ({ post, category }: { post: Post; category: string }) => {
  return (
    <div className="grid grid-cols-[30%_1fr] max-md:grid-cols-[35%_1fr] gap-4 bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative flex-shrink-0 overflow-hidden">
        <Image
          className="object-cover"
          src={post.cover_image}
          fill
          alt={post.title}
        />
      </div>
      <div className="flex flex-col justify-around pr-4 py-4 gap-4">
        <div className="max-md:hidden">
          <TagCard tag={category} />
        </div>
        <Link
          href={`/blog/post/${post.slug}`}
          className="text-2xl font-bold max-md:text-lg"
        >
          {post.title}
        </Link>
        <p className="max-md:text-sm">
          {getShortDescription(post.content, 150)}
        </p>

        <div className="flex items-center gap-2 text-slate-500">
          <EyeIcon className="size-5" />
          <span className="font-bold text-sm">{post.views} Views</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;
