"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";

// Zod schema for validation
const categorySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
});

export default function CreateCategory() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { title: "" },
  });

  const onSubmit = async (data: { title: string }) => {
    setLoading(true);

    const response = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      toast.success("Category created successfully!");
      form.reset(); // Reset form
    } else {
      toast.error("Error: " + result.error);
    }
  };

  return (
    <Card className="max-w-md mx-auto bg-black text-white">
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">
          Create Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex items-end justify-between gap-10"
          >
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="Enter category title"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <Button
              className="bg-white text-slate-700"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
