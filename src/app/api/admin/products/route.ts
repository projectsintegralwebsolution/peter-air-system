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

// GET /api/admin/products/ - List all products with filtering & pagination
export async function GET(request: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const whereClause: any = {};
    if (status === "published") whereClause.isPublished = true;
    if (status === "unpublished") whereClause.isPublished = false;
    if (category && category !== "all") whereClause.categorySlug = category;

    if (query) {
      whereClause.OR = [
        { title: { contains: query } },
        { slug: { contains: query } },
        { overview: { contains: query } },
        { categoryName: { contains: query } },
      ];
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where: whereClause }),
      prisma.product.findMany({
        where: whereClause,
        orderBy: { displayOrder: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/admin/products/ - Create new product
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
      categorySlug,
      categoryName,
      seoTitle,
      metaDescription,
      canonical,
      h1,
      image,
      bannerImage,
      overview,
      fullContent,
      faq,
      features,
      applications,
      specifications,
      displayOrder,
      isPublished,
      isFeatured,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, error: "Product title is required" }, { status: 400 });
    }

    let finalSlug = slugify(customSlug || title);
    const existing = await prisma.product.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const totalCount = await prisma.product.count();

    const newProduct = await prisma.product.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        categorySlug: categorySlug || "hvac-products",
        categoryName: categoryName || "Air Handling & HVAC Systems",
        seoTitle: seoTitle || `${title.trim()} | Peter Air Systems`,
        metaDescription: metaDescription || (overview?.slice(0, 160) || ""),
        canonical: canonical || `https://peterairs.com/${finalSlug}/`,
        h1: h1 || title.trim(),
        image: image || "/images/AHU.jpeg",
        bannerImage: bannerImage || "/images/ahu_banner.png",
        overview: overview || "",
        fullContent: fullContent || `<p>${overview || title}</p>`,
        faq: Array.isArray(faq) ? JSON.stringify(faq) : typeof faq === "string" ? faq : "[]",
        features: Array.isArray(features) ? JSON.stringify(features) : "[]",
        applications: Array.isArray(applications) ? JSON.stringify(applications) : "[]",
        specifications: Array.isArray(specifications) ? JSON.stringify(specifications) : "[]",
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : totalCount + 1,
        isPublished: isPublished !== undefined ? isPublished : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
