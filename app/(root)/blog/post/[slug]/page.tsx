import TagCard from "@/components/ui/tagcard";
import { api } from "@/lib/api";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const slug = await params.slug;
  const post = await api.posts.getByTitle(slug);
  return (
    <section className="container flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 items-center">
          <TagCard tag="Lifestyle" />
          <p className="text-slate-600">September 15, 2021</p>
        </div>
        <h1 className="text-6xl font-bold">{post.title}</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <Image
              src={
                "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/author.jpg"
              }
              alt="author"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="text-slate-400 font-bold">6 mins to read</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <ChatBubbleBottomCenterIcon className="h-5 w-5 text-slate-400" />
              <span className="text-slate-400 font-bold text-sm">
                182 Comments
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HandThumbUpIcon className="h-5 w-5 text-slate-400" />
              <span className="text-slate-400 font-bold text-sm">
                268 Likes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-slate-400" />
              <span className="text-slate-400 font-bold text-sm">9/10</span>
            </div>
          </div>
        </div>
      </div>
      {/* COVER IMAGE */}
      <div className="rounded-lg overflow-hidden relative aspect-[7/3] max-h-[1200px] w-full">
        <Image
          fill
          alt="Cover Image"
          className="object-cover"
          src={post.cover_image}
        />
      </div>
      <div
        className="flex flex-col gap-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </section>
  );
};

export default page;
