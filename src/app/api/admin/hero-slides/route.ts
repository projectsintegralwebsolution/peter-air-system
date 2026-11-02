import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

// GET /api/admin/hero-slides/ - List all slides
export async function GET() {
  try {
    await initDatabase();
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, slides });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch hero slides" },
      { status: 500 }
    );
  }
}

// POST /api/admin/hero-slides/ - Create new slide
export async function POST(request: Request) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      slideNumber,
      badge,
      heading,
      highlightWord,
      supportingText,
      primaryBtnText,
      primaryBtnLink,
      secondaryBtnText,
      secondaryBtnAction,
      secondaryBtnLink,
      image,
      technicalSpecs,
      order,
      isActive,
    } = body;

    if (!heading || !badge) {
      return NextResponse.json({ success: false, error: "Heading and badge are required" }, { status: 400 });
    }

    const totalCount = await prisma.heroSlide.count();
    const newSlide = await prisma.heroSlide.create({
      data: {
        slideNumber: slideNumber || `0${totalCount + 1}`,
        badge,
        heading,
        highlightWord: highlightWord || "",
        supportingText: supportingText || "",
        primaryBtnText: primaryBtnText || "Explore Systems",
        primaryBtnLink: primaryBtnLink || "/air-handling-unit-ahu/",
        secondaryBtnText: secondaryBtnText || "Request Technical Quote",
        secondaryBtnAction: secondaryBtnAction || "modal",
        secondaryBtnLink: secondaryBtnLink || "",
        image: image || "/images/hero-banner-1.png",
        technicalSpecs: Array.isArray(technicalSpecs)
          ? JSON.stringify(technicalSpecs)
          : typeof technicalSpecs === "string"
          ? technicalSpecs
          : "[]",
        order: order !== undefined ? parseInt(order, 10) : totalCount + 1,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, slide: newSlide });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create slide" },
      { status: 500 }
    );
  }
}
