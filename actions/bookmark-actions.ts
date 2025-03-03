"use server";

import { createClient } from "@/utils/supabase/server";

export async function bookmark(postId: number) {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();

  if (error || !userData?.user) {
    return {
      success: false,
      message: "You need to login to add a bookmark.",
    };
  }

  const { data: existingBookmark, error: fetchError } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userData.user.id)
    .single();

  if (!fetchError || existingBookmark) {
    return { success: false, message: "You already bookmarked this post ^.^" };
  }

  const { data: insertedData, error: insertError } = await supabase
    .from("bookmarks")
    .insert({ post_id: postId, user_id: userData.user.id });

  if (insertError) {
    return {
      success: false,
      message: "Error inserting the bookmark table, try again later",
    };
  }

  return {
    success: true,
    message: "Bookmark added successfully",
    data: insertedData,
  };
}

export async function getUserBookmarks() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    return { success: false, message: "Error fetching user data" };
  }

  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select(
      `
    id,
    post_id,
    post: post_id (
    id,
    cover_image,
    title,
    slug,
    created_at,
    content,
    views
    )
  `
    )
    .eq("user_id", userData.user.id);

  if (bookmarksError)
    return { success: false, message: "Error fetching bookmarks" };
  return { success: true, bookmarks: bookmarksData };
}
