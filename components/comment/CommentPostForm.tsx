"use client";
import React, { useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { addComment } from "@/actions/comment-actions";
import toast from "react-hot-toast";

const CommentPostForm = ({ postId }: { postId: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CommentSchema>) => {
    try {
      setLoading(true);
      const { message } = await addComment(postId, data.comment);
      if (message === "Error fetching user") {
        toast.error("You need to be logged in to add a comment.");
      } else {
        toast.success("Your comment has been added!");
        form.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-3xl font-bold">Send a comment</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <Textarea
                  className="min-h-[150px]"
                  {...field}
                  placeholder="Enter your comment here."
                  disabled={loading}
                />
                <FormMessage className="text-red-400 font-bold">
                  {form.formState.errors.comment?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className={`w-[170px] ${
                loading
                  ? "bg-slate-500 text-white cursor-not-allowed"
                  : "bg-primary-500"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentPostForm;
