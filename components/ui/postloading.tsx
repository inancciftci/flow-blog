import React from "react";

const PostLoading = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] z-[1000] fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl font-bold text-white">... Loading post ...</h3>{" "}
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default PostLoading;
