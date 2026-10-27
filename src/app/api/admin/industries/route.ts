import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

export async function GET() {
  try {
    await initDatabase();
    const industries = await prisma.industry.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, industries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, slug, tagline, image, description, challenges, solutions, products, displayOrder } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, error: "Name and slug are required" }, { status: 400 });
    }

    const ind = await prisma.industry.create({
      data: {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        tagline: tagline || "",
        image: image || "/images/Pharmaceuticals.jpg",
        description: description || "",
        challenges: Array.isArray(challenges) ? JSON.stringify(challenges) : "[]",
        solutions: Array.isArray(solutions) ? JSON.stringify(solutions) : "[]",
        products: Array.isArray(products) ? JSON.stringify(products) : "[]",
        displayOrder: displayOrder || 0,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, industry: ind });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
