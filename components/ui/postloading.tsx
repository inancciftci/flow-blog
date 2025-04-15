import React from "react";
import { Skeleton } from "./skeleton";

const PostLoading = () => {
  return (
    <div className="container mx-auto animate-pulse">
      <div className="flex flex-col gap-6 w-full">
        {/* Post header skeleton */}
        <div className="flex gap-4 items-center">
          <Skeleton className="h-8 w-24 rounded-md" /> {/* Tag */}
          <Skeleton className="h-4 w-36" /> {/* Date */}
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Bookmark icon */}
        </div>
        
        {/* Title skeleton */}
        <Skeleton className="h-14 w-[80%]" />
        
        {/* Author info skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-8 w-8 rounded-full" /> {/* Author avatar */}
            <Skeleton className="h-4 w-32" /> {/* Read time */}
          </div>
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-24" /> {/* Comments */}
            <Skeleton className="h-4 w-24" /> {/* Likes */}
            <Skeleton className="h-4 w-24" /> {/* Views */}
          </div>
        </div>
        
        {/* Cover image skeleton */}
        <Skeleton className="aspect-[7/3] w-full rounded-lg" />
        
        {/* Content skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
    </div>
  );
};

export default PostLoading;
