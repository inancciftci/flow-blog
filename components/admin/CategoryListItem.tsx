"use client";

import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { TrashIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";

const CategoryListItem = ({
  category,
  posts,
}: {
  category: Category;
  posts: Post[];
}) => {
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (posts) {
      const filteredPosts = posts.filter(
        (post) => Number(post.category) === Number(category?.id)
      );
      setCategoryPosts(filteredPosts);
      setLoading(false);
    }
  }, [category?.id, posts]);
  const handleDelete = async () => {
    try {
      const res = await api.categories.delete(category?.id);
      if (res.type === "CATEGORY_HAS_POSTS") {
        toast.error("Cannot delete the category that has existing posts");
        return;
      }
      if (res.error) {
        throw new Error(res.error);
      }
      toast.success("Category deleted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell>{category.title}</TableCell>
      <TableCell className="text-right">
        {loading ? `Loading Posts` : `${categoryPosts.length}`}
      </TableCell>

      <TableCell className="text-right">
        <Button onClick={handleDelete} className="bg-primary-500 shadow-sm ">
          <TrashIcon className="w-5 h-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CategoryListItem;
