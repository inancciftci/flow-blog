"use client";

import PostCard from "@/components/admin/PostCard";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await api.posts.getAll();
      const sortedByDate = data.sort((a: Post, b: Post) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
      setSortedPosts(sortedByDate);
      setLoading(false);
    };

    fetchPosts();

    const channel = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          setSortedPosts((prev) =>
            prev.filter((post) => post.id !== payload.old.id)
          );
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-5xl font-bold mb-6">Posts</h1>
      {loading ? (
        <span>Loading</span>
      ) : (
        sortedPosts.map((post: Post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default Page;
