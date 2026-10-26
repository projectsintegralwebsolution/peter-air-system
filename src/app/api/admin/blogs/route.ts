import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";

// Helper to sanitize slug
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

// GET /api/admin/blogs - List blogs with filtering and pagination
export async function GET(request: Request) {
  try {
    await initDatabase();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "all"; // all, published, draft
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const whereClause: any = {};

    if (status === "published") {
      whereClause.isDraft = false;
    } else if (status === "draft") {
      whereClause.isDraft = true;
    }

    if (category && category !== "All") {
      whereClause.category = category;
    }

    if (query) {
      whereClause.OR = [
        { title: { contains: query } },
        { slug: { contains: query } },
        { excerpt: { contains: query } },
        { content: { contains: query } },
      ];
    }

    const [total, posts] = await Promise.all([
      prisma.blog.count({ where: whereClause }),
      prisma.blog.findMany({
        where: whereClause,
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error: any) {
    console.error("[Admin Blogs GET Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/blogs - Create new blog post
export async function POST(request: Request) {
  try {
    await initDatabase();

    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      featuredImage,
      imageAlt,
      author,
      category,
      tags,
      isDraft,
      publishedAt,
      seoTitle,
      metaDescription,
      canonicalUrl,
      ogImage,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }

    let finalSlug = slugify(customSlug || title);
    if (!finalSlug) {
      finalSlug = `post-${Date.now()}`;
    }

    // Check slug collision
    const existing = await prisma.blog.findUnique({
      where: { slug: finalSlug },
    });

    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const isDraftBool = isDraft === true || isDraft === "true";
    const postPublishedAt = publishedAt ? new Date(publishedAt) : isDraftBool ? null : new Date();

    const newBlog = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt?.trim() || title.trim(),
        content: content || `<p>${excerpt || title}</p>`,
        featuredImage: featuredImage || "/images/AHU.jpeg",
        imageAlt: imageAlt || title.trim(),
        author: author || admin.name || "Peter Air Systems Engineering Team",
        category: category || "Cleanroom Components",
        tags: Array.isArray(tags) ? tags.join(", ") : tags || "Cleanroom, HVAC",
        isDraft: isDraftBool,
        publishedAt: postPublishedAt,
        seoTitle: seoTitle || `${title.trim()} | Peter Air Systems`,
        metaDescription: metaDescription || (excerpt?.trim() || title.trim()).slice(0, 160),
        canonicalUrl: canonicalUrl || `https://peterairs.com/blog/${finalSlug}/`,
        ogImage: ogImage || featuredImage || "/images/AHU.jpeg",
        isBase: false,
      },
    });

    // Ensure category exists in Category table
    if (category) {
      const catSlug = slugify(category);
      await prisma.category.upsert({
        where: { slug: catSlug },
        update: {},
        create: {
          name: category,
          slug: catSlug,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      post: newBlog,
    });
  } catch (error: any) {
    console.error("[Admin Blogs POST Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}
