import { dateToString } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SidebarPost = ({ post }: { post: Post }) => {
  const shortTitle =
    post.title.length > 50 ? `${post.title.slice(0, 50)}...` : post.title;

  return (
    <div className="grid grid-cols-[35%_1fr] gap-4 max-md:grid-cols-[20%_1fr]">
      <div className=" aspect-square relative flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={post.cover_image}
          fill
          alt="post.title"
          className="object-cover"
        />
      </div>
      <div className="flex  flex-col gap-2 justify-between max-md:justify-center">
        <Link href={`/blog/post/${post.slug}`} className="text-md font-bold ">
          {shortTitle}
        </Link>
        <span className="font-bold text-slate-500">
          {dateToString(post.created_at)}
        </span>
      </div>
    </div>
  );
};

export default SidebarPost;
