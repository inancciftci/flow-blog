"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";
import { api } from "@/lib/api";

const CategoryListItem = ({ category }: { category: Category }) => {
  const handleDelete = async () => {
    try {
      const response = await api.categories.delete(category?.id);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete category");
      }

      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell>{category.title}</TableCell>

      <TableCell className="text-right">
        <Button onClick={handleDelete} className="bg-black text-white">
          <TrashIcon className="w-5 h-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CategoryListItem;
