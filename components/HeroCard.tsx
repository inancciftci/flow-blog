import Image from "next/image";
import React from "react";
import TagCard from "./ui/tagcard";
import { dateToString } from "@/lib/helper";
import { motion } from "framer-motion";

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  tag: string;
}

interface HeroCardProps {
  post: Post;
}

const HeroCard = ({ post }: HeroCardProps) => {
  return (
    <motion.div
      className="grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col justify-center max-md:items-center max-md:text-center max-md:py-0 gap-8 py-4">
        <div className="flex gap-4 items-center">
          <TagCard tag={post.tag} />
          <p className="text-slate-600">{dateToString(post.date)}</p>
        </div>
        <h1 className="text-5xl max-md:text-4xl font-bold">{post.title}</h1>
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
    </motion.div>
  );
};

export default HeroCard;
