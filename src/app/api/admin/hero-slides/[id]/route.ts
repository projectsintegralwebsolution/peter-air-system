import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

// GET /api/admin/hero-slides/[id]/
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const slide = await prisma.heroSlide.findUnique({
      where: { id: params.id },
    });
    if (!slide) {
      return NextResponse.json({ success: false, error: "Slide not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, slide });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/admin/hero-slides/[id]/
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const currentSlide = await prisma.heroSlide.findUnique({
      where: { id: params.id },
    });
    if (!currentSlide) {
      return NextResponse.json({ success: false, error: "Slide not found" }, { status: 404 });
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

    const updated = await prisma.heroSlide.update({
      where: { id: params.id },
      data: {
        slideNumber: slideNumber !== undefined ? slideNumber : currentSlide.slideNumber,
        badge: badge !== undefined ? badge : currentSlide.badge,
        heading: heading !== undefined ? heading : currentSlide.heading,
        highlightWord: highlightWord !== undefined ? highlightWord : currentSlide.highlightWord,
        supportingText: supportingText !== undefined ? supportingText : currentSlide.supportingText,
        primaryBtnText: primaryBtnText !== undefined ? primaryBtnText : currentSlide.primaryBtnText,
        primaryBtnLink: primaryBtnLink !== undefined ? primaryBtnLink : currentSlide.primaryBtnLink,
        secondaryBtnText: secondaryBtnText !== undefined ? secondaryBtnText : currentSlide.secondaryBtnText,
        secondaryBtnAction: secondaryBtnAction !== undefined ? secondaryBtnAction : currentSlide.secondaryBtnAction,
        secondaryBtnLink: secondaryBtnLink !== undefined ? secondaryBtnLink : currentSlide.secondaryBtnLink,
        image: image !== undefined ? image : currentSlide.image,
        technicalSpecs: technicalSpecs !== undefined
          ? Array.isArray(technicalSpecs)
            ? JSON.stringify(technicalSpecs)
            : technicalSpecs
          : currentSlide.technicalSpecs,
        order: order !== undefined ? parseInt(order, 10) : currentSlide.order,
        isActive: isActive !== undefined ? isActive : currentSlide.isActive,
      },
    });

    return NextResponse.json({ success: true, slide: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/hero-slides/[id]/
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await prisma.heroSlide.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Slide deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
