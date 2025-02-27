"use client";
import CategoryPost from "@/components/post/CategoryPost";
import PostLoading from "@/components/ui/postloading";
import { api } from "@/lib/api";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategoryPosts = async () => {
      const { slug } = await params;
      const category = await api.categories.getBySlug(slug);
      const posts = await api.posts.getByCategory(category.id);
      setCategoryPosts(posts);
      setLoading(false);
    };
    fetchCategoryPosts();
  }, [params]);
  if (loading)
    return (
      <div className="h-[100vh]">
        <PostLoading />
      </div>
    );
  return (
    <div className="flex flex-col gap-10 my-6">
      {categoryPosts.map((post: Post) => (
        <CategoryPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;
