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

  // Helper function for comment formatting
  const formatComment = (comment) => ({
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
  });

  useEffect(() => {
    // Try to get from page props first (already fetched in parent component)
    if (window.initialComments && window.initialComments[postId]) {
      const cachedComments = window.initialComments[postId].map(formatComment);
      setComments(cachedComments);
    } else {
      // Fetch comments only if not provided in props
      const fetchComments = async () => {
        try {
          const commentData = await getPostComments(postId);
          const formattedComments = commentData.map(formatComment);
          setComments(formattedComments);
          
          // Cache for potential reuse
          if (!window.initialComments) window.initialComments = {};
          window.initialComments[postId] = commentData;
        } catch (error) {
          console.error("Failed to fetch comments", error);
        }
      };
      fetchComments();
    }

    // Set up realtime subscription for new comments
    const channel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        async (payload) => {
          try {
            // More efficient approach: only fetch the new comment directly
            // This assumes we can identify the comment's post id from payload
            if (payload.new && payload.new.post_id === postId) {
              // Optimistic update with available data
              const newComment = formatComment(payload.new);
              setComments((prev) => [...(prev || []), newComment]);
            }
          } catch (error) {
            console.error("Failed to process new comment", error);
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
