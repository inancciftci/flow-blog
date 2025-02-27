import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("category"); // Category filter
    const searchQuery = searchParams.get("search"); // Search term

    let query = supabase.from("posts").select(`
      id, 
      title, 
      content, 
      views, 
      cover_image, 
      category, 
      category!inner(id, title)
    `);

    if (categoryId) {
      query = query.eq("category", categoryId);
    }

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    query = query.order("views", { ascending: false });

    const { data, error } = await query;

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
