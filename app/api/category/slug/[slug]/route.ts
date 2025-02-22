import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .ilike("slug", slug);
    if (error || !data.length) {
      return NextResponse.json(
        { error: "Category not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(data[0], { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
