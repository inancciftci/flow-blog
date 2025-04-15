"use client";
import React, { useEffect, useState } from "react";
import SidebarPost from "./SidebarPost";
import { api } from "@/lib/api";

const PostSidebar = ({ posts, slug }: { posts: Post[]; slug: string }) => {
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const mostViewedPosts = posts
    .sort((a: Post, b: Post) => b.views - a.views)
    .slice(0, 4);
  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        // Get cached post first from localStorage if available
        const cachedPostData = localStorage.getItem(`post_${slug}`);
        let postData;
        
        if (cachedPostData) {
          postData = JSON.parse(cachedPostData);
        } else {
          postData = await api.posts.getBySlug(slug);
          // Cache for future use
          localStorage.setItem(`post_${slug}`, JSON.stringify(postData));
        }
        
        // Get cached category posts if available
        const cachedCategoryPosts = localStorage.getItem(`category_posts_${postData.category}`);
        
        if (cachedCategoryPosts) {
          setCategoryPosts(JSON.parse(cachedCategoryPosts).slice(0, 4));
        } else {
          const categoryPosts = await api.posts.getByCategory(postData?.category);
          // Cache for future use
          localStorage.setItem(`category_posts_${postData.category}`, JSON.stringify(categoryPosts));
          setCategoryPosts(categoryPosts.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching category posts:", error);
      }
    };
    fetchCategoryPosts();
  }, [slug]);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-slate-700">Most popular</h3>
        <div className="flex h-[2px] w-full">
          <div className="h-full bg-primary-500 w-[30%]"></div>
          <div className="h-full bg-primary-100 w-[70%]"></div>
        </div>

        {mostViewedPosts.map((post) => (
          <SidebarPost key={post.id} post={post} />
        ))}
      </div>

      <div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-slate-700">Related posts</h3>
          <div className="flex h-[2px] w-full">
            <div className="h-full bg-primary-500 w-[30%]"></div>
            <div className="h-full bg-primary-100 w-[70%]"></div>
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
