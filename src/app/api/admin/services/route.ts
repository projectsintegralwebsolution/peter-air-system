import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

export async function GET() {
  try {
    await initDatabase();
    const services = await prisma.service.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, services });
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
    const { name, slug, description, icon, deliverables, displayOrder } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, error: "Name and slug are required" }, { status: 400 });
    }

    const srv = await prisma.service.create({
      data: {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description || "",
        icon: icon || "ShieldCheck",
        deliverables: Array.isArray(deliverables) ? JSON.stringify(deliverables) : "[]",
        displayOrder: displayOrder || 0,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, service: srv });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
