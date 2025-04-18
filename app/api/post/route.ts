import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
      id,
      created_at, 
      title, 
      content,
      slug, 
      views, 
      cover_image, 
      category, 
      category!inner(id, title) 
    `
      )
      .order("views", { ascending: false });

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formattedData = data.map((post) => ({
      ...post,
      category: post.category.id,
      categoryTitle: post.category.title,
    }));

    return new NextResponse(JSON.stringify(formattedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        details: (err as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("category") as string; // Category ID from frontend
    const file = formData.get("coverImage") as File | null;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: categoryData, error: categoryError } = await supabase
      .from("category")
      .select("id")
      .eq("id", categoryId)
      .single();

    if (categoryError || !categoryData) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    let imageUrl = null;
    if (file) {
      const filePath = `blog/${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, buffer, { contentType: file.type });

      if (error) throw new Error("Image upload failed: " + error.message);

      const { data: publicURLData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);
      imageUrl = publicURLData.publicUrl;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          slug,
          cover_image: imageUrl,
          category: categoryId,
          views: 0,
        },
      ])
      .select();

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, post: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
