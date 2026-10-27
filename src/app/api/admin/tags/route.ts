import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function GET() {
  try {
    await initDatabase();
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, tags });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Tag name required" }, { status: 400 });
    }

    const slug = slugify(name);
    const existing = await prisma.tag.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Tag already exists" }, { status: 400 });
    }

    const tag = await prisma.tag.create({
      data: { name: name.trim(), slug },
    });

    return NextResponse.json({ success: true, tag });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create tag" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Tag ID required" }, { status: 400 });
    }

    await prisma.tag.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Tag deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete tag" },
      { status: 500 }
    );
  }
}
