import { getUserBookmarks } from "@/actions/bookmark-actions";
import { getUserComments } from "@/actions/comment-actions";
import UserImage from "@/components/user/UserImage";
import UserUpdateForm from "@/components/user/UserUpdateForm";
import { CommentsProvider } from "@/context/CommentsContext";
import { api } from "@/lib/api";
import { getShortDescription } from "@/lib/helper";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return <div>User not found</div>;
  }

  const bookmarks = await getUserBookmarks();
  const comments = await getUserComments();

  const userProfile = await api.user.get(user.id);
  return (
    <div>
      <div className="bg-primary-500">
        <div className="container">
          <div className="grid grid-cols-[30%_1fr] gap-10">
            <div className="flex flex-col gap-4 relative ">
              <div className="absolute top-[-0.5rem] right-[25%] z-[10]">
                <UserUpdateForm userData={userProfile} type="imageAndName" />
              </div>

              <UserImage src={userProfile.avatar_url} />

              {!userProfile.first_name && (
                <p className="text-center ">{userProfile.username}</p>
              )}
              {userProfile.first_name && (
                <p className="text-center font-bold text-lg tracking-wide">{`${userProfile.first_name} ${userProfile.last_name}`}</p>
              )}
            </div>
            <div className="flex flex-col justify-center gap-10">
              <div className="flex items-center justify-center gap-10">
                <div className="bg-primary-100 rounded-md p-4 flex flex-col gap items-center">
                  <span className="font-bold text-5xl">
                    {bookmarks?.bookmarks?.length}
                  </span>
                  <p className="text-slate-500 font-bold">Bookmarks</p>
                </div>
                <div className="bg-primary-100 rounded-md p-4 flex flex-col items-center">
                  <span className="font-bold text-5xl">
                    {comments?.data?.length}
                  </span>
                  <p className="text-slate-500 font-bold">Comments</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg relative">
                <div className="absolute bottom-[-1rem] left-[1rem]">
                  <UserUpdateForm userData={userProfile} type="bio" />
                </div>
                {userProfile.bio && (
                  <p className="text-center">
                    {getShortDescription(userProfile.bio, 250)}
                  </p>
                )}
                {!userProfile.bio && <p>No bio...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 container">
        <div className="grid grid-cols-[20%_1fr] gap-10">
          <div className="border-r-[2px] border-primary-500 pr-4">
            <div className="flex flex-col">
              <Link href={"/profile/comments"}>Comments</Link>
              <Link href={"/profile/bookmarks"}>Bookmarks</Link>
            </div>
          </div>
          <div>
            <CommentsProvider comments={comments?.data ?? []}>
              {children}
            </CommentsProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
