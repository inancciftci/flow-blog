"use client";
import EditorsPick from "@/components/EditorsPick";
import Hero from "@/components/Hero";
import RecentArticles from "@/components/RecentArticles";
import TrendingTopics from "@/components/TrendingTopics";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
export const runtime = "edge";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await api.posts.getAll();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section>
      <Hero posts={posts} />
      <TrendingTopics posts={posts} />
      <EditorsPick />
      <RecentArticles posts={posts} />
    </section>
  );
}
