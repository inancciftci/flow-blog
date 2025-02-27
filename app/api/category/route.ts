import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Add this line

export async function GET() {
  try {
    const { data, error } = await supabase.from("category").select("*");

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", err: err }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const slug = formData.get("slug") as string;
    const file = formData.get("coverImage") as File | null;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = null;

    if (file) {
      const filePath = `category/${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error } = await supabase.storage
        .from("category-images")
        .upload(filePath, buffer, { contentType: file.type });

      if (error) throw new Error("Image upload failed: " + error.message);

      const { data: publicURLData } = supabase.storage
        .from("category-images")
        .getPublicUrl(filePath);
      imageUrl = publicURLData.publicUrl;
    }

    const { data, error } = await supabase
      .from("category")
      .insert([{ title, description, slug, cover_image: imageUrl }]);

    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true, post: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating post: ", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new NextResponse(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
      });
    }

    const { data: relatedPosts, error: checkError } = await supabase
      .from("posts")
      .select("id")
      .eq("category", id)
      .limit(1);

    if (checkError) {
      return new NextResponse(JSON.stringify({ error: checkError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (relatedPosts && relatedPosts.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Cannot delete category with existing posts",
          type: "CATEGORY_HAS_POSTS",
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { error } = await supabase.from("category").delete().eq("id", id);

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
