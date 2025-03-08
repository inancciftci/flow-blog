import React from "react";

const PostLoading = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] z-[1000] fixed top-0 left-0 min-h-[100vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default PostLoading;
