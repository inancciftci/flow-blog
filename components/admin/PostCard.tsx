"use client";

import { dateToStringDetail, getShortDescription } from "@/lib/helper";
import { EyeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const PostCard = ({ post }: { post: Post }) => {
  const deleteHandler = async () => {
    try {
      await api.posts.delete(String(post.id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  return (
    <div className="p-2 bg-slate-200 rounded-sm">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 relative h-[100%]">
          <Image
            className="object-cover rounded-sm"
            src={post.cover_image}
            fill
            alt={`${post.title} image`}
          />
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <h3 className="text-lg font-bold"> {post.title}</h3>
          <p>{getShortDescription(post.content, 75)}</p>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <EyeIcon className="size-5" />
              <span className="">{post.views}</span>
            </div>
            <span></span>
            <span></span>
          </div>
          <span>{dateToStringDetail(post.created_at)}</span>
          <Button onClick={deleteHandler}>Delete this post</Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
