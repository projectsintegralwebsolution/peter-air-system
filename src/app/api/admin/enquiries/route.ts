import { NextResponse } from "next/server";
import { getEnquiriesList } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const result = await getEnquiriesList({ status, search, page, limit });
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
