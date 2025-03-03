"use client";

import React, { createContext, useContext } from "react";

type Comment = {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
};

const CommentsContext = createContext<Comment[] | null>(null);

export const CommentsProvider = ({
  children,
  comments,
  posts,
}: {
  children: React.ReactNode;
  comments: Comment[];
  posts: Post[];
}) => {
  return (
    <CommentsContext.Provider value={{ comments, posts }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);
