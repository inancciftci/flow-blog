import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(uuid: number) {
  try {
    const { data, error } = await supabase.from("user_profiles");
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
