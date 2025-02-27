import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const categoryId = id;

    if (!categoryId || isNaN(Number(categoryId))) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("posts")
      .select(
        `id,
        created_at, 
      title, 
      content,
      slug, 
      views, 
      cover_image, 
      category, 
      category!inner(id, title)  `
      )
      .eq("category", Number(categoryId));

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const formattedData = data.map((post) => ({
      ...post,
      category: post.category.id,
      categoryTitle: post.category.title,
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
