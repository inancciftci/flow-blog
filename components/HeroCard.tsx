import Image from "next/image";
import React from "react";
import TagCard from "./ui/tagcard";
import { dateToString } from "@/lib/helper";

// interface Post {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   date: string;
//   tag: string;
// }

const dummyPost = {
  id: 1,
  title: "30 Best Lifestyle Blogs to Follow in 2021",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
  image:
    "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-10.jpg",
  date: "2021-09-01",
  tag: "Lifestyle",
};

const HeroCard = () => {
  const post = dummyPost;
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-10">
      <div className="flex flex-col gap-8 py-4">
        <div className="flex gap-4 items-center">
          <TagCard tag={post.tag} />
          <p className="text-slate-600">{dateToString(post.date)}</p>
        </div>
        <h1 className="text-5xl font-bold">{post.title}</h1>
        <p className="text-slate-600">{post.description}</p>
      </div>
      <div className="relative h-[100%] aspect-square rounded-lg overflow-hidden">
        <Image
          className="object-cover aspect-square"
          src={post.image}
          alt="post image"
          fill
        />
      </div>
    </div>
  );
};

export default HeroCard;
