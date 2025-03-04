"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { getUserImage, signOut } from "@/app/auth/auth-actions";

const LoginButton = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { success, avatarUrl } = await getUserImage();
        setIsLoggedIn(success);
        setAvatarUrl(avatarUrl);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  if (!isLoggedIn) {
    return <Link href="/login">Login</Link>;
  }

  return (
    <div className="flex gap-4 items-center">
      {avatarUrl ? (
        <Link href={"/profile"} className="h-[30px] w-[30px] relative">
          <Image
            src={avatarUrl}
            alt="User Profile"
            fill
            className="rounded-full object-cover"
          />
        </Link>
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}
      <Button onClick={signOut} className="bg-primary-100">
        Logout
      </Button>
    </div>
  );
};

export default LoginButton;
