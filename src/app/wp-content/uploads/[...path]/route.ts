import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { resolveBlogImageUrl } from "@/lib/imageUtils";

export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
};

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  try {
    const rawSegments = params?.path || [];
    const segments = rawSegments.filter(Boolean);
    if (segments.length === 0) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const filename = segments[segments.length - 1];
    const resolvedPath = resolveBlogImageUrl(filename);
    const cleanSubPath = resolvedPath.replace(/^\//, "");

    const candidates = [
      path.join(process.cwd(), "public", cleanSubPath),
      path.join(process.cwd(), "public", "images", filename),
      path.join(process.cwd(), "public", "uploads", filename),
      path.join(process.cwd(), ".next", "standalone", "public", cleanSubPath),
      path.join("/app", "public", cleanSubPath),
    ];

    let targetFile = candidates.find((p) => {
      try {
        return fs.existsSync(p) && fs.statSync(p).isFile();
      } catch {
        return false;
      }
    });

    if (!targetFile) {
      // Fallback to AHU.jpeg
      const fallback = path.join(process.cwd(), "public", "images", "AHU.jpeg");
      if (fs.existsSync(fallback)) {
        targetFile = fallback;
      }
    }

    if (!targetFile) {
      return new NextResponse("Image Not Found", { status: 404 });
    }

    const buffer = fs.readFileSync(targetFile);
    const ext = path.extname(targetFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || "image/jpeg";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("[WP Content Uploads Route Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
