import Image from "next/image";
import React from "react";
import TagCard from "./ui/tagcard";
import { ClockIcon } from "@heroicons/react/20/solid";

const TrendingTopicsCard = ({
  post,
}: {
  post: { id: number; title: string; tag: string; date: string; image: string };
}) => {
  return (
    <div className=" rounded-[1rem] overflow-hidden flex-flex-col shadow-lg">
      <div className="relative h-[200px]">
        <Image
          className="object-cover z-[-1]"
          src={post.image}
          alt={post.title}
          fill
        />
        <TagCard absoluteTop tag={post.tag} />
      </div>
      <div className="bg-white">
        <div className="flex gap-1 items-center pl-[2rem] pt-[1.5rem]">
          <ClockIcon className="size-5" />
          <p className="text-gray-600">{post.date}</p>
        </div>
        <h2 className="text-xl font-[600] px-[2rem] pt-[1rem] pb-[2rem]">
          {post.title}
        </h2>
      </div>
    </div>
  );
};

export default TrendingTopicsCard;
