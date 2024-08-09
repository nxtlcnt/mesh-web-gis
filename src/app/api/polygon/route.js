import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from("lstmap")
      .select("*");

    if (error) {
      throw error;
    }

    return NextResponse.json({
      status: 200,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    return NextResponse.json({
      status: 400,
      error: error.message || "An unexpected error occurred",
    });
  }
}
