"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function revalidateProfilePage() {
  revalidatePath("/profile", "layout");
}

export async function updateName(formdata: FormData) {
  try {
    const supabase = await createClient();
    const firstName = formdata.get("firstName") as string;
    const lastName = formdata.get("lastName") as string;

    if (!firstName && !lastName) {
      return { success: false, message: "At least one field is required" };
    }

    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      console.error("Auth error:", authError);
      return { success: false, message: "User not authenticated" };
    }

    const userId = userData.user.id;

    const { data: userProfile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return {
        success: false,
        message: "Failed to fetch user profile",
        error: profileError,
      };
    }

    const updateData: { first_name?: string; last_name?: string } = {};

    if (firstName) updateData.first_name = firstName;
    if (lastName) updateData.last_name = lastName;

    const { data: updatedData, error: updateError } = await supabase
      .from("user_profiles")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (updateError) {
      console.error("Update error:", updateError);
      return {
        success: false,
        message: "Failed to update profile",
        error: updateError,
      };
    }

    return {
      success: true,
      message: "Profile updated successfully",
      before: userProfile,
      after: updatedData,
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred", error };
  }
}

export async function updateImage(formdata: FormData) {
  try {
    const supabase = await createClient();

    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      console.error("Auth error:", authError);
      return { success: false, message: "User not authenticated" };
    }

    const userId = userData.user.id;
    const file = formdata.get("avatarUrl") as File | null;

    let imageUrl: string | undefined = undefined;
    if (file) {
      const filePath = `avatar/${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error } = await supabase.storage
        .from("avatar-images")
        .upload(filePath, buffer, { contentType: file.type });

      if (error) throw new Error("Image upload failed: " + error.message);

      const { data: publicURLData } = supabase.storage
        .from("avatar-images")
        .getPublicUrl(filePath);
      imageUrl = publicURLData.publicUrl;
    }
    const updateData: { avatar_url?: string } = {};
    if (file && imageUrl) updateData.avatar_url = imageUrl;

    const { error: updateError } = await supabase
      .from("user_profiles")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (updateError) {
      console.error("Update error:", updateError);
      return {
        success: false,
        message: "Failed to update profile",
        error: updateError,
      };
    }

    return {
      success: true,
      message: "Profile updated successfully",
      avatarUrl: imageUrl,
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function updateBio(formdata: FormData) {
  try {
    const supabase = await createClient();
    const bio = formdata.get("bio") as string;
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData?.user) {
      console.error("Auth error:", authError);
      return { success: false, message: "User not authenticated" };
    }
    const userId = userData.user.id;

    const updateData: { bio?: string } = {};
    if (bio) updateData.bio = bio;
    const { error: updateError } = await supabase
      .from("user_profiles")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (updateError) {
      console.error("Update error:", updateError);
      return {
        success: false,
        message: "Failed to update profile",
        error: updateError,
      };
    }
    return {
      success: true,
      message: "Profile updated successfully",
      bio: bio,
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, message: "An unexpected error occurred" };
  }
}
