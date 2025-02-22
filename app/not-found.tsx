"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-full bg-primary-100 flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image src={"/logo.svg"} alt="logo" width={200} height={500} />
        <p className="font-bold">Page you looking for is not found.</p>
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => router.back()}
            className="bg-primary-500 font-bold text-slate-700 py-2 px-4 text-sm rounded-sm shadow-md"
          >
            Go back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="bg-primary-500 font-bold text-slate-700 py-2 px-4 text-sm rounded-sm shadow-md"
          >
            Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
