"use client";

import { dateToStringDetail, getShortDescription } from "@/lib/helper";
import { EyeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const PostCard = ({ post }: { post: Post }) => {
  const [hidden, setHidden] = useState(true);
  const deleteHandler = async () => {
    try {
      await api.posts.delete(String(post.id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  const modalHandler = () => {
    setHidden(!hidden);
  };
  return (
    <div className="p-2 bg-primary-100 rounded-sm">
      <div
        className={`h-full w-full fixed z-10 top-0 left-0 bg-[rgba(241,245,249,0.5)] flex justify-center items-center ${
          hidden ? "hidden" : ""
        }`}
      >
        <div className="bg-primary-100 rounded-lg p-10 gap-6 flex flex-col items-center">
          <h4 className="text-2xl font-bold">Are you sure?</h4>
          <p>You can`t get the post back after you delete.</p>
          <div className="flex gap-10">
            <Button
              onClick={deleteHandler}
              className="bg-primary-500 shadow-md"
            >
              Delete
            </Button>
            <Button onClick={modalHandler} className="bg-primary-500 shadow-md">
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 max-md:grid-cols-6 gap-6">
        <div className="col-span-1 relative w-[100%] max-md:col-span-2 ">
          <Image
            className="object-cover rounded-sm"
            src={post.cover_image}
            fill
            alt={`${post.title} image`}
          />
        </div>

        <div className="col-span-3 max-md:col-span-4 flex flex-col gap-4">
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
          <Button className="w-[20%] bg-primary-500" onClick={modalHandler}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
