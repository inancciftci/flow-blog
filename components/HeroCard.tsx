import Image from "next/image";
import React from "react";
import TagCard from "./ui/tagcard";
import { dateToString, getShortDescription } from "@/lib/helper";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroCardProps {
  post: Post;
}

const HeroCard = ({ post }: HeroCardProps) => {
  const shortDescription = getShortDescription(post.content);

  return (
    <motion.div
      className="grid grid-cols-2 gap-10 max-md:grid-cols-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col justify-center max-md:items-center max-md:text-center max-md:py-0 gap-8 py-4">
        <div className="flex gap-4 items-center">
          <TagCard tag={post.categoryTitle || "Unknown"} />
          <p className="text-slate-600">{dateToString(post?.created_at)}</p>
        </div>
        <Link href={`/blog/post/${post.slug}`}>
          <h1 className="text-5xl max-md:text-4xl font-bold">{post.title}</h1>
        </Link>

        <p className="text-slate-600">{shortDescription}</p>
      </div>
      <div className="relative h-[100%] max-w-[100%] aspect-square rounded-lg overflow-hidden">
        <Image
          className="object-cover aspect-square"
          src={post.cover_image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
        />
      </div>
    </motion.div>
  );
};

export default HeroCard;
