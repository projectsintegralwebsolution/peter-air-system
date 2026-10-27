import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

// GET /api/admin/content - List all editable content blocks
export async function GET() {
  try {
    await initDatabase();
    const content = await prisma.siteContent.findMany({
      orderBy: [{ section: "asc" }, { key: "asc" }],
    });
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch content" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/content - Update single or multiple content items
export async function PUT(request: Request) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Supports single item { key, value } or array of items [{ key, value }]
    if (Array.isArray(body)) {
      for (const item of body) {
        if (item.key && item.value !== undefined) {
          await prisma.siteContent.upsert({
            where: { key: item.key },
            update: { value: item.value },
            create: {
              key: item.key,
              value: item.value,
              section: item.section || "general",
              label: item.label || item.key,
            },
          });
        }
      }
      return NextResponse.json({ success: true, message: "Site content updated successfully" });
    } else {
      const { key, value, label, section } = body;
      if (!key || value === undefined) {
        return NextResponse.json({ success: false, error: "Key and value are required" }, { status: 400 });
      }

      const updated = await prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: {
          key,
          value,
          label: label || key,
          section: section || "general",
        },
      });

      return NextResponse.json({ success: true, item: updated });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update content" },
      { status: 500 }
    );
  }
}
