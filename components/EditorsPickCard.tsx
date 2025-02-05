import Image from "next/image";
import React from "react";
import TagCard from "./ui/tagcard";
import { dateToString } from "@/lib/helper";
import { motion } from "framer-motion";

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string;
  date: string;
}

interface PostProps {
  post: Post;
}

const EditorsPickCard = ({ post }: PostProps) => {
  return (
    <motion.div className="grid grid-cols-2 max-md:grid-cols-1 gap-10 items-center relative bg-primary-100 px-[3.5rem] py-[2rem] max-md:p-[1.5rem] rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex gap-6 items-center">
          <TagCard tag={post.tag} />
          <p className="text-md text-slate-500">{dateToString(post.date)}</p>
        </div>
        <h1 className="text-5xl font-bold">{post.title}</h1>
        <p className="text-slate-600">{post.description}</p>
      </div>
      <div className="relative top-[-8rem] max-md:top-[0] shadow-[3px_3px_2px_0px] shadow-primary-500  h-[100%] aspect-square rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
};

export default EditorsPickCard;
