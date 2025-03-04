"use client";

import { useComments } from "@/context/CommentsContext";

const CommentsPage = () => {
  const context = useComments();
  const comments = context?.comments || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Comments</h2>
      {comments?.length ? (
        comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-lg mb-2">
            <p className="text-sm text-gray-800">{comment.content}</p>
            <span className="text-xs text-gray-500">
              {comment.user?.first_name ?? "Anonymous"} •{" "}
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentsPage;
