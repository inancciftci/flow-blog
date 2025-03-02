import React from "react";

interface Comment {
  id: string;
  post_id: number;
  user_id: string;
  content: string;
  created_at: string;
}

const UserComments = ({ comments }: { comments: Comment[] }) => {
  return (
    <div>
      {comments.map((item) => (
        <p key={item.id}>{item.content}</p>
      ))}
    </div>
  );
};

export default UserComments;
