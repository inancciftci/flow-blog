"use client";

import PostLoading from "@/components/ui/postloading";
import TagCard from "@/components/ui/tagcard";
import { api } from "@/lib/api";
import { dateToString } from "@/lib/helper";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const [post, setPost] = useState<Post>();
  const [category, setCategory] = useState<Category>();
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchPostAndCategory = async () => {
      try {
        const postData = await api.posts.getBySlug(slug);
        const categoryData = await api.categories.getById(postData.category);
        setPost(postData);
        setCategory(categoryData);

        await api.posts.incrementView(postData.id);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    if (slug) fetchPostAndCategory();
  }, [slug]);

  if (!post || !category) {
    return (
      <div className="h-[100vh]">
        <PostLoading />
      </div>
    );
  }
  return (
    <section className="container flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 items-center">
          <TagCard tag={category.title} />
          <p className="text-slate-600">{dateToString(post.created_at)}</p>
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

export default Page;
