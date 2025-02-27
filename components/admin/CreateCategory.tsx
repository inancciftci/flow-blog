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
import { createSlug } from "@/lib/helper";
import { CreateCategorySchema } from "@/lib/validations";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

// Zod schema for validation

export default function CreateCategory() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: { title: "", description: "", coverImage: undefined },
  });

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("coverImage", file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: z.infer<typeof CreateCategorySchema>) => {
    try {
      setLoading(true);
      const formData = new FormData();
      const slug = createSlug(data.title);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("slug", slug);

      if (data.coverImage) {
        formData.append("coverImage", data.coverImage);
      }

      const result = await api.categories.create(formData);
      setLoading(false);

      if (result.error) {
        throw new Error(result.error || "Failed to create post");
      }
      toast.success("Category created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <Card className="max-w-[60%] max-md:max-w-[100%] mb-10 shadow-sm ">
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
            <div className="flex flex-col gap-4 w-full">
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

              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  type="file"
                  className="cursor-pointer"
                  accept="image/*"
                  onChange={imageHandler}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="title">Description</Label>
                <Input
                  id="description"
                  {...form.register("description")}
                  placeholder="Enter category description"
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
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
