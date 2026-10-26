import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initDatabase } from "@/lib/db";

export async function GET() {
  try {
    await initDatabase();

    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalProducts,
      publishedProducts,
      totalHeroSlides,
      totalEnquiries,
      newEnquiries,
      totalCategories,
      totalProductCategories,
      totalIndustries,
      totalServices,
      totalMedia,
      totalRedirects,
      viewAggregate,
      recentBlogs,
      recentEnquiries,
    ] = await Promise.all([
      prisma.blog.count(),
      prisma.blog.count({ where: { isDraft: false } }),
      prisma.blog.count({ where: { isDraft: true } }),
      prisma.product.count(),
      prisma.product.count({ where: { isPublished: true } }),
      prisma.heroSlide.count({ where: { isActive: true } }),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: "new" } }),
      prisma.category.count(),
      prisma.productCategory.count(),
      prisma.industry.count(),
      prisma.service.count(),
      prisma.mediaAsset.count(),
      prisma.redirect.count(),
      prisma.blog.aggregate({
        _sum: { views: true },
      }),
      prisma.blog.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          isDraft: true,
          views: true,
          updatedAt: true,
          publishedAt: true,
        },
      }),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalProducts,
        publishedProducts,
        totalHeroSlides,
        totalEnquiries,
        newEnquiries,
        totalCategories,
        totalProductCategories,
        totalIndustries,
        totalServices,
        totalMedia,
        totalRedirects,
        totalViews: viewAggregate._sum.views || 0,
        recentBlogs,
        recentEnquiries,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
