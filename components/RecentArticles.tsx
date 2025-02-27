"use client";

import React, { useEffect, useState } from "react";
import TrendingTopicsCard from "./TrendingTopicsCard";

const RecentArticles = ({ posts }: { posts: Post[] }) => {
  const [recentArticles, setRecentArticles] = useState<Post[]>([]);
  useEffect(() => {
    const sortedByDate = posts.sort((a: Post, b: Post) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });

    setRecentArticles(sortedByDate.slice(0, 4));
  }, [posts]);
  return (
    <section className="container my-10 flex flex-col gap-10 max-md:mt-4">
      <div className="flex flex-col mb-10 max-md:text-center max-md:mb-0">
        <h1 className="text-5xl text-slate-700 font-bold max-md:text-4xl">
          Recent Articles
        </h1>
        <h3 className="text-2xl max-md:text-xl text-slate-500">
          Don&apos;t miss new trend
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
        {recentArticles.map((post) => (
          <TrendingTopicsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RecentArticles;
