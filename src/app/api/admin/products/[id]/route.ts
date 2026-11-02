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

// GET /api/admin/products/[id]/
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/admin/products/[id]/
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const currentProduct = await prisma.product.findUnique({
      where: { id: params.id },
    });
    if (!currentProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
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

    let newSlug = currentProduct.slug;
    if (customSlug && customSlug !== currentProduct.slug) {
      const sanitized = slugify(customSlug);
      const collision = await prisma.product.findFirst({
        where: {
          slug: sanitized,
          NOT: { id: currentProduct.id },
        },
      });

      if (collision) {
        return NextResponse.json(
          { success: false, error: `Slug "${sanitized}" is already used by another product.` },
          { status: 400 }
        );
      }

      newSlug = sanitized;

      // Automatically create a 301 redirect from old slug to new slug
      const oldPath = `/${currentProduct.slug}/`;
      const newPath = `/${newSlug}/`;

      await prisma.redirect.upsert({
        where: { sourcePath: oldPath },
        update: { destinationPath: newPath, statusCode: 301 },
        create: { sourcePath: oldPath, destinationPath: newPath, statusCode: 301 },
      });
      console.log(`[Product CMS] Created 301 redirect: ${oldPath} -> ${newPath}`);
    }

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        title: title !== undefined ? title.trim() : currentProduct.title,
        slug: newSlug,
        categorySlug: categorySlug !== undefined ? categorySlug : currentProduct.categorySlug,
        categoryName: categoryName !== undefined ? categoryName : currentProduct.categoryName,
        seoTitle: seoTitle !== undefined ? seoTitle : currentProduct.seoTitle,
        metaDescription: metaDescription !== undefined ? metaDescription : currentProduct.metaDescription,
        canonical: canonical !== undefined ? canonical : `https://peterairs.com/${newSlug}/`,
        h1: h1 !== undefined ? h1 : currentProduct.h1,
        image: image !== undefined ? image : currentProduct.image,
        bannerImage: bannerImage !== undefined ? bannerImage : currentProduct.bannerImage,
        overview: overview !== undefined ? overview : currentProduct.overview,
        fullContent: fullContent !== undefined ? fullContent : currentProduct.fullContent,
        faq: faq !== undefined ? (Array.isArray(faq) ? JSON.stringify(faq) : faq) : currentProduct.faq,
        features: features !== undefined ? (Array.isArray(features) ? JSON.stringify(features) : features) : currentProduct.features,
        applications: applications !== undefined ? (Array.isArray(applications) ? JSON.stringify(applications) : applications) : currentProduct.applications,
        specifications: specifications !== undefined ? (Array.isArray(specifications) ? JSON.stringify(specifications) : specifications) : currentProduct.specifications,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : currentProduct.displayOrder,
        isPublished: isPublished !== undefined ? isPublished : currentProduct.isPublished,
        isFeatured: isFeatured !== undefined ? isFeatured : currentProduct.isFeatured,
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/products/[id]/
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
