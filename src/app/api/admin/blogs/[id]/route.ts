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

// GET /api/admin/blogs/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: blog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blogs/[id]
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

    const currentBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!currentBlog) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
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

    let newSlug = currentBlog.slug;
    if (customSlug && customSlug !== currentBlog.slug) {
      const sanitized = slugify(customSlug);
      // Verify not already taken by another post
      const slugCollision = await prisma.blog.findFirst({
        where: {
          slug: sanitized,
          NOT: { id: currentBlog.id },
        },
      });

      if (slugCollision) {
        return NextResponse.json(
          { success: false, error: `Slug "${sanitized}" is already in use by another article.` },
          { status: 400 }
        );
      }

      newSlug = sanitized;

      // Create automatic 301 redirect from old slug to new slug
      const oldPath = `/blog/${currentBlog.slug}`;
      const newPath = `/blog/${newSlug}`;

      await prisma.redirect.upsert({
        where: { sourcePath: oldPath },
        update: {
          destinationPath: newPath,
          statusCode: 301,
        },
        create: {
          sourcePath: oldPath,
          destinationPath: newPath,
          statusCode: 301,
        },
      });

      console.log(`[Admin CMS] Created 301 redirect: ${oldPath} -> ${newPath}`);
    }

    const isDraftBool = isDraft !== undefined ? (isDraft === true || isDraft === "true") : currentBlog.isDraft;
    let postPublishedAt = currentBlog.publishedAt;
    if (publishedAt) {
      postPublishedAt = new Date(publishedAt);
    } else if (!isDraftBool && !currentBlog.publishedAt) {
      postPublishedAt = new Date();
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: currentBlog.id },
      data: {
        title: title !== undefined ? title.trim() : currentBlog.title,
        slug: newSlug,
        excerpt: excerpt !== undefined ? excerpt.trim() : currentBlog.excerpt,
        content: content !== undefined ? content : currentBlog.content,
        featuredImage: featuredImage !== undefined ? featuredImage : currentBlog.featuredImage,
        imageAlt: imageAlt !== undefined ? imageAlt : currentBlog.imageAlt,
        author: author !== undefined ? author : currentBlog.author,
        category: category !== undefined ? category : currentBlog.category,
        tags: tags !== undefined ? (Array.isArray(tags) ? tags.join(", ") : tags) : currentBlog.tags,
        isDraft: isDraftBool,
        publishedAt: postPublishedAt,
        seoTitle: seoTitle !== undefined ? seoTitle : currentBlog.seoTitle,
        metaDescription: metaDescription !== undefined ? metaDescription : currentBlog.metaDescription,
        canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : `https://peterairs.com/blog/${newSlug}/`,
        ogImage: ogImage !== undefined ? ogImage : currentBlog.ogImage,
      },
    });

    if (category) {
      const catSlug = slugify(category);
      await prisma.category.upsert({
        where: { slug: catSlug },
        update: {},
        create: { name: category, slug: catSlug },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      post: updatedBlog,
    });
  } catch (error: any) {
    console.error("[Admin Blogs PUT Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blogs/[id]
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

    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: `Blog "${blog.title}" deleted successfully`,
    });
  } catch (error: any) {
    console.error("[Admin Blogs DELETE Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete blog" },
      { status: 500 }
    );
  }
}
