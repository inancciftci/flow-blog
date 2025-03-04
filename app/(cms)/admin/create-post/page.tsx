import CreatePostForm from "@/components/admin/CreatePostForm";
import React from "react";
export const runtime = "edge";
const page = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-slate-700 font-bold">Create a Blog Post</h1>
      <CreatePostForm />
    </div>
  );
};

export default page;
