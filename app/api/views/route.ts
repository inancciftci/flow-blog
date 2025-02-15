import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();

    if (!postId)
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );

    const { data, error } = await supabase
      .from("posts")
      .select("views")
      .eq("id", postId)
      .single();

    if (error || !data) throw new Error(error?.message || "Post not found");

    const { error: updateError } = await supabase
      .from("posts")
      .update({ views: data.views + 1 })
      .eq("id", postId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, views: data.views + 1 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
