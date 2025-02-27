"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TagFilterCard from "./ui/tagfiltercard";
import { api } from "@/lib/api";
import { createSlug } from "@/lib/helper";
import CategoryPost from "./post/CategoryPost";
import PostLoading from "./ui/postloading";

const FilteredPosts = ({ categories }: { categories: Category[] }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await api.posts.getAll();

      if (category === "all") {
        setFilteredPosts(postData);
      } else {
        const filteredByCategory = postData.filter(
          (post: Post) => createSlug(post.categoryTitle) === category
        );
        setFilteredPosts(filteredByCategory);
      }
    };
    fetchPosts();
    setLoading(false);
  }, [searchParams, category]);

  const updateParams = (update: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(update).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (loading) return <PostLoading />;

  return (
    <div>
      <div className="flex items-center gap-4 bg-primary-500 rounded-md p-4">
        <h3 className="text-2xl  font-bold">Categories: </h3>
        {categories.map((cat: Category) => (
          <TagFilterCard
            onClick={() => updateParams({ category: `${cat.slug}` })}
            category={cat}
            key={cat.id}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 my-4">
        {filteredPosts.map((p: Post) => (
          <CategoryPost key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default FilteredPosts;
