"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
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

const BlogPostForm = () => {
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });
  const onSubmit = (data: z.infer<typeof CreatePostSchema>) => {
    console.log("Blog Post Data:", data);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 py-10"
        >
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input {...field} placeholder="Enter post title..." />
              </FormItem>
            )}
          />

          {/* Category Dropdown */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Tiptap Editor */}
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

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Publish Post
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default BlogPostForm;
