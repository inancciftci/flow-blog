"use client";

import React, { useEffect, useState } from "react";
import TrendingTopicsCard from "./TrendingTopicsCard";

const TrendingTopics = ({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) => {
  const [trendingTopics, setTrendingTopics] = useState<Post[]>([]);
  useEffect(() => {
    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.title;
      return acc;
    }, {} as Record<number, string>);

    const enrichedPosts = posts.map((post: Post) => ({
      ...post,
      categoryTitle: categoryMap[post.category],
    }));

    setTrendingTopics(
      enrichedPosts.sort((a: Post, b: Post) => b.views - a.views).slice(0, 6)
    );
  }, [categories, posts]);
  return (
    <section className="relative h-[100%]">
      <div className="w-[45%] h-[90%] bg-[#fff4ec] absolute top-[-2rem] -z-20 "></div>
      <div className="container">
        <h1 className="text-5xl text-slate-700 font-bold mb-24 max-md:text-center max-md:mb-14 max-md:text-4xl">
          Trending Topics
        </h1>
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 my-[2.5rem]">
          {trendingTopics.map((post) => (
            <TrendingTopicsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTopics;
