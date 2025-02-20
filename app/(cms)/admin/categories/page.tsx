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
    const fetchCategories = async () => {
      setLoading(true);
      const data = await api.categories.getAll();
      setCategories(data);
      setLoading(false);
    };

    fetchCategories();

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
      <h1 className="text-5xl font-bold mb-10">Category List</h1>
      <div className="bg-slate-100 px-4 py-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Delete</TableHead>
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
      <div className="my-10">
        <CreateCategory />
      </div>
    </div>
  );
}
