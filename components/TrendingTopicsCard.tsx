import Image from "next/image";
import React from "react";
import TagCard from "./ui/tagcard";
import { ClockIcon } from "@heroicons/react/20/solid";
import { dateToString } from "@/lib/helper";
import Link from "next/link";

const TrendingTopicsCard = ({ post }: { post: Post }) => {
  return (
    <div className=" rounded-[1rem] overflow-hidden flex-flex-col shadow-lg hover:translate-y-[-1rem] duration-300">
      <div className="relative h-[300px] max-md:h-[200px]">
        <Image
          className="object-cover"
          src={post?.cover_image}
          alt={post?.title}
          fill
        />
        {post.categoryTitle && <TagCard absoluteTop tag={post.categoryTitle} />}
      </div>
      <div className="bg-white flex flex-col gap-4 p-8">
        <div className="flex gap-1 items-center ">
          <ClockIcon className="size-5 text-slate-400" />
          <p className="text-slate-400 font-bold">
            {dateToString(post.created_at)}
          </p>
        </div>
        <Link
          href={`/blog/post/${post.slug}`}
          className="text-xl font-[600] cursor-pointer"
        >
          {post.title}
        </Link>
      </div>
    </div>
  );
};

export default TrendingTopicsCard;
