"use client";

import CategoryListItem from "@/components/admin/CategoryListItem";
import CreateCategory from "@/components/admin/CreateCategory";
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesandPosts = async () => {
      setLoading(true);
      const categoryData = await api.categories.getAll();
      setCategories(categoryData);
      setLoading(false);
    };

    fetchCategoriesandPosts();

    const channel = supabase
      .channel("category")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "category" },
        (payload) => {
          setCategories((prev) => [...prev, payload.new as Category]);
          toast.success("New category added!");
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "category" },
        (payload) => {
          setCategories((prev) =>
            prev.filter((cat) => cat.id !== payload.old.id)
          );
          toast.success("Category deleted!");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Category List</h1>
      <CreateCategory />
      <div className="bg-primary-100 px-4 py-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">ID</TableHead>
              <TableHead className="font-bold">Title</TableHead>
              <TableHead className="text-right font-bold">Post Count</TableHead>
              <TableHead className="text-right font-bold">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Loading categories ...</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <CategoryListItem category={category} key={category.id} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
