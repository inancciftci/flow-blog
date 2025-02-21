"use client";
import React, { useEffect, useState } from "react";
import SidebarPost from "./SidebarPost";
import { api } from "@/lib/api";

const PostSidebar = ({
  posts,
  categories,
  slug,
}: {
  posts: Post[];
  categories: Category[];
  slug: string;
}) => {
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const mostViewedPosts = posts
    .sort((a: Post, b: Post) => b.views - a.views)
    .slice(0, 4);
  useEffect(() => {
    const fetchCategoryPosts = async () => {
      const postData = await api.posts.getBySlug(slug);
      const category = categories.filter((cat) => cat.id === postData.category);
      const filteredPosts = posts.filter(
        (post) => Number(post.category) === Number(category[0].id)
      );
      setCategoryPosts(filteredPosts.slice(0, 4));
    };
    fetchCategoryPosts();
  }, [slug, posts, categories]);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-slate-700">Most popular</h3>
        <div className="flex h-[2px] w-full">
          <div className="h-full bg-black w-[30%]"></div>
          <div className="h-full bg-slate-300 w-[70%]"></div>
        </div>

        {mostViewedPosts.map((post) => (
          <SidebarPost key={post.id} post={post} />
        ))}
      </div>

      <div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-slate-700">Related posts</h3>
          <div className="flex h-[2px] w-full">
            <div className="h-full bg-black w-[30%]"></div>
            <div className="h-full bg-slate-300 w-[70%]"></div>
          </div>
          {categoryPosts.length > 0 ? (
            categoryPosts.map((post) => (
              <SidebarPost key={post.id} post={post} />
            ))
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
