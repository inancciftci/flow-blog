"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TiptapEditor from "@/components/ui/tiptap";
import { CreatePostSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BlogPostForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.categories.getAll();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      coverImage: undefined,
    },
  });
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("coverImage", file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: z.infer<typeof CreatePostSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("category", data.category);

      if (data.coverImage) {
        formData.append("coverImage", data.coverImage);
      }

      const result = await api.posts.create(formData);

      if (result.error) {
        throw new Error(result.error || "Failed to create post");
      }
      toast.success("Post created successfully!");
      router.push("/admin/posts");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 py-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input {...field} placeholder="Enter post title..." />
                <FormMessage className="text-red-400 font-bold">
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={loading ? "Loading..." : "Select category"}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((category) => (
                      <SelectItem
                        className="cursor-pointer hover:bg-gray-100"
                        key={category.id}
                        value={String(category.id)}
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400 font-bold">
                  {form.formState.errors.category?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={() => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <Input
                  type="file"
                  className="cursor-pointer"
                  accept="image/*"
                  onChange={imageHandler}
                />
                <FormMessage className="text-red-400 font-bold">
                  {form.formState.errors.coverImage?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <TiptapEditor name="content" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Publish Post
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default BlogPostForm;
