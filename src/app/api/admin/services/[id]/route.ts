import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await initDatabase();
    const srv = await prisma.service.findUnique({ where: { id: params.id } });
    if (!srv) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, service: srv });
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
    const updated = await prisma.service.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug?.toLowerCase(),
        description: body.description,
        icon: body.icon,
        deliverables: Array.isArray(body.deliverables) ? JSON.stringify(body.deliverables) : body.deliverables,
        displayOrder: body.displayOrder !== undefined ? parseInt(body.displayOrder, 10) : undefined,
        isActive: body.isActive,
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
