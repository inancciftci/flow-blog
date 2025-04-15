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
      try {
        // Try to get from cache first
        const cachedPosts = localStorage.getItem('homepage_posts');
        
        if (cachedPosts) {
          // Use cached data immediately
          setPosts(JSON.parse(cachedPosts));
          
          // Then update in background
          const freshData = await api.posts.getAll();
          setPosts(freshData);
          localStorage.setItem('homepage_posts', JSON.stringify(freshData));
        } else {
          // No cache available, fetch fresh data
          const data = await api.posts.getAll();
          setPosts(data);
          localStorage.setItem('homepage_posts', JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Attempt to get data if cache failed
        const data = await api.posts.getAll();
        setPosts(data);
      }
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
