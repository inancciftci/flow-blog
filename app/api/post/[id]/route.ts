import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const postId = id;

    if (!postId)
      return NextResponse.json({ error: "Missing post id" }, { status: 400 });

    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("id, cover_image")
      .eq("id", postId)
      .single();

    if (fetchError || !post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.cover_image) {
      const filePath = post.cover_image.split("/").pop();
      if (filePath) {
        await supabase.storage.from("blog-images").remove([`blog/${filePath}`]);
      }
    }
    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (deleteError) {
      throw new Error("Failed to delete post: " + deleteError.message);
    }

    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
