import Image from "next/image";
import React from "react";
import TagCard from "./ui/tagcard";
import { ClockIcon } from "@heroicons/react/20/solid";

const TrendingTopicsCard = ({
  post,
}: {
  post: {
    id: number;
    title: string;
    tag: string;
    date: string;
    image: string;
    author?: string;
  };
}) => {
  return (
    <div className=" rounded-[1rem] overflow-hidden flex-flex-col shadow-lg hover:translate-y-[-1rem] duration-300">
      <div className="relative h-[300px] max-md:h-[200px]">
        <Image
          className="object-cover"
          src={post.image}
          alt={post.title}
          fill
        />
        <TagCard absoluteTop tag={post.tag} />
      </div>
      <div className="bg-white flex flex-col gap-4 p-8">
        <div className="flex gap-1 items-center ">
          <ClockIcon className="size-5 text-slate-400" />
          <p className="text-slate-400 font-bold">{post.date}</p>
        </div>
        <h2 className="text-xl font-[600] ">{post.title}</h2>
        {post.author && (
          <div className="flex gap-4 items-center">
            <Image
              width={32}
              height={32}
              className="rounded-full"
              alt="Author Image"
              src={
                "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/author.jpg"
              }
            />
            <p className="text-slate-500 font-bold">{post.author}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingTopicsCard;
