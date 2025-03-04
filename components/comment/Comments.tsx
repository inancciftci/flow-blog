"use client";

import { getPostComments } from "@/actions/comment-actions";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Comment = {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  user?: {
    name: string;
    avatar_url?: string | null;
  };
};

const Comments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentData = await getPostComments(postId);

        const formattedComments: Comment[] = commentData.map((comment) => ({
          ...comment,
          user: comment.user
            ? {
                name:
                  comment.user.first_name && comment.user.last_name
                    ? `${comment.user.first_name} ${comment.user.last_name}`
                    : comment.user.username ?? "Anonymous",
                avatar_url: comment.user.avatar_url,
              }
            : undefined,
        }));

        setComments(formattedComments);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchComments();

    const channel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        async (payload) => {
          try {
            const newCommentId = payload.new.id;
            const newCommentData = await getPostComments(postId);
            const newComment = newCommentData.find(
              (comment) => comment.id === newCommentId
            );

            if (newComment) {
              const formattedComment: Comment = {
                ...newComment,
                user: newComment.user
                  ? {
                      name:
                        newComment.user.first_name && newComment.user.last_name
                          ? `${newComment.user.first_name} ${newComment.user.last_name}`
                          : newComment.user.username ?? "Anonymous",
                      avatar_url: newComment.user.avatar_url,
                    }
                  : undefined,
              };

              setComments((prev) => [...(prev || []), formattedComment]);
            }
          } catch (error) {
            console.error("Failed to fetch new comment data", error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  if (!comments || comments.length === 0) {
    return <div>No comments...</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 border rounded-lg">
          <p className="text-sm text-gray-800">{comment.content}</p>
          <div className="flex items-center gap-2 mt-2">
            {comment.user?.avatar_url && (
              <Image
                src={comment.user.avatar_url}
                alt={comment.user.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-xs text-gray-500">
              {comment.user?.name ?? "Anonymous"} •{" "}
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
