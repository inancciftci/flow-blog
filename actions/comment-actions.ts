"use server";
import { createClient } from "@/utils/supabase/server";

export async function addComment(postId: number, comment: string) {
  const supabase = await createClient();

  if (!comment) {
    return {
      success: false,
      message: "Comment is empty",
    };
  }

  const { data: userData, error: userFetchError } =
    await supabase.auth.getUser();

  if (userFetchError) {
    return {
      success: false,
      message: "Error fetching user",
    };
  }

  const userId = userData.user.id;

  const { data: insertedData, error: insertError } = await supabase
    .from("comments")
    .insert({ post_id: postId, user_id: userId, content: comment });

  if (insertError) {
    return {
      success: false,
      message: "Error inserting the comment",
    };
  }

  return {
    success: true,
    message: "Comment successfully added.",
    comment: insertedData,
  };
}
export async function getPostComments(postId: number) {
  const supabase = await createClient();

  const { data: comments, error: fetchError } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      user_id,
      created_at,
      user: user_id (
        id,
        first_name,
        last_name,
        avatar_url,
        username
      )
    `
    )
    .eq("post_id", postId);

  if (fetchError) {
    console.error("Error fetching comments:", fetchError.message);
    return [];
  }

  return comments;
}

export async function getUserComments() {
  const supabase = await createClient();
  const { data: userData, error: userFetchError } =
    await supabase.auth.getUser();
  if (userFetchError) {
    console.error("Error fetching user");
    return {
      success: false,
      message: "Error fetching user",
    };
  }
  const userId = userData.user?.id;
  const { data: comments, error: fetchError } = await supabase
    .from("comments")
    .select(
      `
        id,
        content,
        user_id,
        created_at,
        user: user_id (
            id,
            first_name,
            last_name
        )
        `
    )
    .eq("user_id", userId);

  if (fetchError) {
    console.error("Error fetching comments");
    return {
      success: false,
      message: "Error fetching comments",
    };
  }

  return {
    success: true,
    message: "Fetched user & comments successfully",
    data: comments,
  };
}
