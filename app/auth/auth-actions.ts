"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
// import { headers } from "next/headers";

export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return null;
  }
  return { status: "success", user: data.session?.user };
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      emailRedirectTo: `${redirectUrl}/complete-registration`,
      data: {
        username: credentials.username,
      },
    },
  });

  if (error) {
    return { status: error.message, user: null };
  } else if (data?.user?.identities?.length === 0) {
    return { status: "User with this email already exists", user: null };
  }
  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) return { status: error?.message, user: null };

  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", credentials?.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase.from("user_profiles").insert({
      email: data?.user.email,
      username: data?.user?.user_metadata?.username,
    });

    if (insertError) {
      return { status: insertError?.message, user: null };
    }
  }

  revalidatePath("/", "layout");

  return { status: "success", user: data.user };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) redirect("/error");
}

export async function getUserImage() {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    return { success: false, message: "Error getting user data" };
  }

  const userId = userData.user.id;
  const { data: userProfile, error: profileError } = await supabase
    .from("user_profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (profileError || !userProfile) {
    return { success: false, message: "Error fetching user image" };
  }

  return { success: true, avatarUrl: userProfile.avatar_url };
}
