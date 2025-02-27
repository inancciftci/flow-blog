"use client";
import React, { useEffect, useState } from "react";

import BlogHeroCard from "./BlogHeroCard";
import PostLoading from "./ui/postloading";

const BlogHero = ({ categories }: { categories: Category[] }) => {
  const [topCategories, setTopCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTopCategories(categories.slice(0, 5));

    setLoading(false);
  }, [categories]);
  if (loading) return <PostLoading />;
  return (
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 ">
      <BlogHeroCard big category={topCategories[0]} />
      <div className="grid grid-rows-2 grid-cols-2 gap-4">
        {topCategories.slice(1, 5).map((cat) => (
          <BlogHeroCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default BlogHero;
