import CreatePostForm from "@/components/admin/CreatePostForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold">Create a Blog Post</h1>
      <CreatePostForm />
    </div>
  );
};

export default page;
