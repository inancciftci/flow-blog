"use client";

import React, { createContext, useContext } from "react";

interface CommentsContextType {
  comments: CommentInterface[];
  posts: PostContextInterface[];
}

const CommentsContext = createContext<CommentsContextType | null>(null);

export const CommentsProvider = ({
  children,
  comments,
  posts,
}: {
  children: React.ReactNode;
  comments: CommentInterface[];
  posts: PostContextInterface[];
}) => {
  return (
    <CommentsContext.Provider value={{ comments, posts }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);
