import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

export async function GET() {
  try {
    await initDatabase();
    const categories = await prisma.productCategory.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug, shortDescription, bannerImage, featuredImage, displayOrder } = await request.json();
    if (!name || !slug) {
      return NextResponse.json({ success: false, error: "Name and slug are required" }, { status: 400 });
    }

    const cat = await prisma.productCategory.create({
      data: {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        shortDescription: shortDescription || "",
        bannerImage: bannerImage || "/images/ahu_banner.png",
        featuredImage: featuredImage || "/images/AHU.jpeg",
        productSlugs: "[]",
        displayOrder: displayOrder || 0,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, category: cat });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
