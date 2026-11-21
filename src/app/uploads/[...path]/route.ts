import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
    // Filter out empty segments or trailing slashes
    const segments = rawSegments.filter(Boolean);
    if (segments.length === 0) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const relativePath = segments.join("/");
    // Sanitize against directory traversal
    const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, "");

    // Priority paths to search for persistent uploads:
    const candidates = [
      path.join(process.cwd(), "public", "uploads", safePath),
      path.join(process.cwd(), ".next", "standalone", "public", "uploads", safePath),
    ];

    if (process.cwd().includes(".next")) {
      const projectRoot = process.cwd().split(".next")[0];
      candidates.push(path.join(projectRoot, "public", "uploads", safePath));
    }

    // Docker absolute container directory fallback
    candidates.push(path.join("/app", "public", "uploads", safePath));

    let targetFile = candidates.find((p) => {
      try {
        return fs.existsSync(p) && fs.statSync(p).isFile();
      } catch {
        return false;
      }
    });

    if (!targetFile) {
      return new NextResponse("Image Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const buffer = fs.readFileSync(targetFile);
    const ext = path.extname(targetFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("[Uploads Route Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
