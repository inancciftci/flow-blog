import { getPostComments } from "@/actions/comment-actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type UserProfile = {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  username?: string;
};

type Comment = {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  user?: {
    name: string;
    avatar_url?: string;
  };
};

const Comments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentData: {
          id: number;
          content: string;
          user_id: number;
          created_at: string;
          user: UserProfile | null;
        }[] = await getPostComments(postId);

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
  }, [postId]);

  if (!comments || comments.length === 0) {
    return <div>No comments...</div>;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-2xl font-bold">Comments</h4>
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
