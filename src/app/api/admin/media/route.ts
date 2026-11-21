import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";
import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure upload directory exists
function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

// GET /api/admin/media - List all uploaded media assets
export async function GET(request: Request) {
  try {
    await initDatabase();
    ensureUploadsDir();

    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, assets });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch media assets" },
      { status: 500 }
    );
  }
}

// POST /api/admin/media - Multipart image file upload
export async function POST(request: Request) {
  try {
    await initDatabase();
    ensureUploadsDir();

    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Validate MIME type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF, SVG, AVIF`,
        },
        { status: 400 }
      );
    }

    // Limit size to 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds 10MB maximum limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Map MIME types to canonical file extension
    const mimeToExt: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/avif": ".avif",
      "image/gif": ".gif",
      "image/svg+xml": ".svg",
    };

    let ext = path.extname(file.name).toLowerCase();
    if (!ext || ext === ".") {
      ext = mimeToExt[file.type] || ".jpg";
    }

    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 50) || "upload";

    const uniqueFilename = `${baseName}-${Date.now()}${ext}`;

    // 1. Determine persistent project root directory
    let rootUploadsDir = path.join(process.cwd(), "public", "uploads");
    if (process.cwd().includes(".next")) {
      const projectRoot = process.cwd().split(".next")[0];
      rootUploadsDir = path.join(projectRoot, "public", "uploads");
    }
    if (!fs.existsSync(rootUploadsDir)) {
      fs.mkdirSync(rootUploadsDir, { recursive: true });
    }
    fs.writeFileSync(path.join(rootUploadsDir, uniqueFilename), buffer);

    // 2. Mirror to current process public/uploads if different
    const currentUploadsDir = path.join(process.cwd(), "public", "uploads");
    if (currentUploadsDir !== rootUploadsDir) {
      if (!fs.existsSync(currentUploadsDir)) {
        fs.mkdirSync(currentUploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(currentUploadsDir, uniqueFilename), buffer);
    }

    // 3. Mirror to standalone uploads directory if it exists
    const standaloneUploadsDir = path.join(process.cwd(), ".next", "standalone", "public", "uploads");
    if (standaloneUploadsDir !== rootUploadsDir && fs.existsSync(path.dirname(standaloneUploadsDir))) {
      if (!fs.existsSync(standaloneUploadsDir)) {
        fs.mkdirSync(standaloneUploadsDir, { recursive: true });
      }
      try {
        fs.writeFileSync(path.join(standaloneUploadsDir, uniqueFilename), buffer);
      } catch (e) {
        console.warn("[Media Upload] Standalone mirror write skipped:", e);
      }
    }

    // 4. Mirror to Linux container persistent mount /app/public/uploads if it exists
    if (fs.existsSync("/app/public/uploads") && rootUploadsDir !== "/app/public/uploads") {
      try {
        fs.writeFileSync(path.join("/app/public/uploads", uniqueFilename), buffer);
      } catch (e) {
        console.warn("[Media Upload] /app/public/uploads mirror skipped:", e);
      }
    }

    const publicUrl = `/uploads/${uniqueFilename}`;

    // Clean human-readable altText derived from filename if not provided or generic
    const cleanAltText = altText && altText !== "About qc inspection"
      ? altText.trim()
      : baseName.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    // Record in database
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        filename: uniqueFilename,
        url: publicUrl,
        mimeType: file.type,
        size: file.size,
        altText: cleanAltText,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      asset: mediaAsset,
    });
  } catch (error: any) {
    console.error("[Media Upload Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/media - Remove file from storage and database
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
      return NextResponse.json({ success: false, error: "Asset ID is required" }, { status: 400 });
    }

    const asset = await prisma.mediaAsset.findUnique({
      where: { id },
    });

    if (!asset) {
      return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 });
    }

    // Try deleting physical file from all persistent locations
    try {
      const filename = path.basename(asset.url);
      const possibleDirs = [
        path.join(process.cwd(), "public", "uploads"),
        path.join(process.cwd(), ".next", "standalone", "public", "uploads"),
      ];
      if (process.cwd().includes(".next")) {
        possibleDirs.push(path.join(process.cwd().split(".next")[0], "public", "uploads"));
      }
      for (const d of possibleDirs) {
        const p = path.join(d, filename);
        if (fs.existsSync(p)) {
          fs.unlinkSync(p);
        }
      }
    } catch (e) {
      console.warn("[Media Disk Delete]", e);
    }

    await prisma.mediaAsset.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Asset deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete asset" },
      { status: 500 }
    );
  }
}
