import BlogHero from "@/components/BlogHero";
import FilteredPosts from "@/components/FilteredPosts";
import { api } from "@/lib/api";
import React from "react";
export const dynamic = "force-dynamic";

const Page = async () => {
  const categories = await api.categories.getAll();
  return (
    <div className="container flex flex-col gap-4">
      <BlogHero categories={categories} />
      <FilteredPosts categories={categories} />
    </div>
  );
};

export default Page;
