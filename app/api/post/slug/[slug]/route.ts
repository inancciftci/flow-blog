import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ slug: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .ilike("slug", slug);

    if (error || !data.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", err },
      { status: 500 }
    );
  }
}
