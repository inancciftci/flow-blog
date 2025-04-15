import React from "react";
import { Skeleton } from "./skeleton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const SkeletonHero = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[80vh]">
      <div className="w-[40%] bg-[#fff4ec] absolute right-0 top-[-15rem] -z-20"></div>
      <div className="flex items-center max-md:my-[1rem] my-[2.5rem]">
        <ChevronLeftIcon 
          className="w-[50px] text-primary-500 cursor-pointer absolute left-0 z-[100] max-md:hidden opacity-50" 
        />

        <div className="container relative">
          <div className="hidden max-md:flex w-full justify-center items-center">
            <ChevronLeftIcon className="w-[50px] text-primary-500 cursor-pointer opacity-50" />
            <ChevronRightIcon className="w-[50px] text-primary-500 cursor-pointer opacity-50" />
          </div>
          
          <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
            <div className="flex flex-col justify-center max-md:items-center max-md:text-center max-md:py-0 gap-8 py-4">
              <div className="flex gap-4 items-center">
                <Skeleton className="h-8 w-24 rounded-md" /> {/* Tag */}
                <Skeleton className="h-4 w-36" /> {/* Date */}
              </div>
              
              <Skeleton className="h-14 w-[90%]" /> {/* Title line 1 */}
              <Skeleton className="h-14 w-[70%]" /> {/* Title line 2 */}
              
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
                <Skeleton className="h-4 w-full" /> {/* Description line 2 */}
                <Skeleton className="h-4 w-[80%]" /> {/* Description line 3 */}
              </div>
            </div>
            
            <Skeleton className="relative aspect-square rounded-lg" /> {/* Hero image */}
          </div>
        </div>

        <ChevronRightIcon 
          className="w-[50px] text-primary-500 cursor-pointer absolute right-0 max-md:hidden opacity-50" 
        />
      </div>
    </div>
  );
};

export default SkeletonHero;