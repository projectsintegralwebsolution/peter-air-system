import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

export async function GET() {
  try {
    await initDatabase();
    const redirects = await prisma.redirect.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, redirects });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch redirects" },
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

    const { sourcePath, destinationPath, statusCode } = await request.json();
    if (!sourcePath || !destinationPath) {
      return NextResponse.json(
        { success: false, error: "Source path and destination path are required" },
        { status: 400 }
      );
    }

    const redirect = await prisma.redirect.upsert({
      where: { sourcePath },
      update: {
        destinationPath,
        statusCode: statusCode || 301,
      },
      create: {
        sourcePath,
        destinationPath,
        statusCode: statusCode || 301,
      },
    });

    return NextResponse.json({ success: true, redirect });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save redirect" },
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
      return NextResponse.json({ success: false, error: "Redirect ID required" }, { status: 400 });
    }

    await prisma.redirect.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Redirect deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete redirect" },
      { status: 500 }
    );
  }
}
