import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await initDatabase();
    const ind = await prisma.industry.findUnique({ where: { id: params.id } });
    if (!ind) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, industry: ind });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const updated = await prisma.industry.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug?.toLowerCase(),
        tagline: body.tagline,
        image: body.image,
        description: body.description,
        challenges: Array.isArray(body.challenges) ? JSON.stringify(body.challenges) : body.challenges,
        solutions: Array.isArray(body.solutions) ? JSON.stringify(body.solutions) : body.solutions,
        products: Array.isArray(body.products) ? JSON.stringify(body.products) : body.products,
        displayOrder: body.displayOrder !== undefined ? parseInt(body.displayOrder, 10) : undefined,
        isActive: body.isActive,
      },
    });

    return NextResponse.json({ success: true, industry: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await prisma.industry.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: "Industry deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
