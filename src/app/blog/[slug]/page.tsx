
function getValidBlogImage(src?: string): string {
  if (!src) return '/images/clean-healthcare.jpg';
  if (src.startsWith('/images/')) return src;
  if (src.includes('wp-content/uploads')) {
    const fn = src.split('/').pop()?.split('?')[0]?.replace(/-\d+x\d+(\.[a-zA-Z]+)$/, '$1');
    if (fn) {
      if (fn === 'Air-handling-unit.jpg' || fn === 'Air-handling-unit--1024x683.jpg') return '/images/Air-handling-unit-.jpg';
      if (fn.toLowerCase() === 'pre-filter.jpg') return '/images/pre-filter.jpg';
      if (fn.includes('Static-Pass-Box')) return '/images/Static-Pass-Box.jpg';
      if (fn.includes('Air-Showers')) return '/images/Air-Showers.jpg';
      if (fn.includes('AHU')) return '/images/AHU.jpeg';
      if (fn.includes('Chemical-Reactor')) return '/images/Chemical-Reactor.jpg';
      if (fn.includes('GMP-Pharmaceutical-Panel')) return '/images/GMP-Pharmaceutical-Panel-PUF-Panel.jpg';
      return '/images/' + fn;
    }
  }
  return src;
}
import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  Tag,
  ArrowRight,
  Clock,
  ListTree,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { ArticleSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import { siteConfig } from "@/data/siteConfig";
import { blogPosts } from "@/data/blogs";
import { decodeHtmlEntities } from "@/lib/textUtils";
import { products } from "@/data/products";
import { BlogConsultationCard } from "@/components/BlogConsultationCard";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/db";

// Pre-render blog posts
export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    if (slugs && slugs.length > 0) {
      return slugs.slice(0, 50).map((slug) => ({ slug }));
    }
  } catch (e) {}
  return blogPosts.slice(0, 50).map((p) => ({ slug: p.slug }));
}

interface BlogPostProps {
  params: {
    slug: string;
  };
  searchParams?: {
    preview?: string;
  };
}

export async function generateMetadata({ params, searchParams }: BlogPostProps): Promise<Metadata> {
  let post: any = null;
  try {
    const dbPost = await getBlogPostBySlug(params.slug, searchParams?.preview === "true");
    if (dbPost && !("redirectUrl" in dbPost)) {
      post = dbPost;
    }
  } catch (e) {}

  if (!post) {
    post = blogPosts.find((p) => p.slug === params.slug);
  }

  if (!post) return { title: "Blog Article" };

  const canonicalUrl = post.canonicalUrl || `https://peterairs.com/blog/${params.slug}/`;

  return {
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: canonicalUrl,
      images: [{ url: post.ogImage || post.featuredImage }],
      type: "article",
      publishedTime: post.date,
    },
  };
}

// Injects IDs into existing h2 and h3 elements for table of contents anchor targets
// Preserves 100% of the original content, images, paragraphs, and links
function attachHeadingIds(html: string) {
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, text) => {
    if (attrs.includes("id=")) return match;
    const cleanText = decodeHtmlEntities(text.replace(/<[^>]+>/g, "").trim());
    const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

// Removes redundant occurrence of the featured image from the beginning of the article content
// so the hero featured image is displayed only once without duplicate repetition in the body.
function removeDuplicateFeaturedImage(html: string, featuredImage?: string): string {
  if (!featuredImage) return html;
  const filename = decodeURIComponent(featuredImage.split("/").pop()?.split("?")[0] || "");
  if (!filename) return html;

  const lowerHtml = html.toLowerCase();
  const lowerFile = filename.toLowerCase();
  const imgIdx = lowerHtml.indexOf(lowerFile);
  if (imgIdx === -1) return html;

  // Only remove if it appears near the top of the article body (before main content / headings)
  const h2Idx = lowerHtml.indexOf("<h2");
  const threshold = h2Idx !== -1 ? h2Idx + 200 : 8000;
  if (imgIdx > threshold) return html;

  // Check if inside an Elementor section
  const secStart = html.lastIndexOf("<section", imgIdx);
  const secEnd = html.indexOf("</section>", imgIdx);
  if (secStart !== -1 && secEnd !== -1 && secEnd > imgIdx) {
    const fullSec = html.slice(secStart, secEnd + 10);
    const hasOtherContent =
      fullSec.includes("elementor-widget-button") ||
      fullSec.includes("elementor-widget-text-editor") ||
      fullSec.includes("elementor-widget-heading") ||
      fullSec.includes("<h2") ||
      fullSec.includes("<p") ||
      fullSec.includes("<ul");
    if (!hasOtherContent) {
      // Cleanly remove the entire image-only section so no empty wrapper remains
      return html.slice(0, secStart) + html.slice(secEnd + 10);
    }

    // Section has other content (e.g. an enquiry button). Remove only the image widget.
    const widgetStart = html.lastIndexOf('<div class="elementor-element', imgIdx);
    const containerEnd = html.indexOf("</div>", imgIdx);
    if (widgetStart !== -1 && containerEnd !== -1) {
      const widgetEnd = html.indexOf("</div>", containerEnd + 6);
      if (widgetEnd !== -1) {
        return html.slice(0, widgetStart) + html.slice(widgetEnd + 6);
      }
    }
  }

  // Fallback for non-elementor markup: direct <img> or <figure>
  const imgTagStart = html.lastIndexOf("<img", imgIdx);
  const imgTagEnd = html.indexOf(">", imgIdx);
  if (imgTagStart !== -1 && imgTagEnd !== -1) {
    const pStart = html.lastIndexOf("<p", imgTagStart);
    const pEnd = html.indexOf("</p>", imgTagEnd);
    if (pStart !== -1 && pEnd !== -1 && pEnd - pStart < 1500 && html.slice(pStart, imgTagStart).replace(/<[^>]+>/g, "").trim() === "") {
      return html.slice(0, pStart) + html.slice(pEnd + 4);
    }
    return html.slice(0, imgTagStart) + html.slice(imgTagEnd + 1);
  }

  return html;
}

export default async function BlogPostDetail({ params, searchParams }: BlogPostProps) {
  let post: any = null;
  const isPreview = searchParams?.preview === "true";

  try {
    const dbPost = await getBlogPostBySlug(params.slug, isPreview);
    if (dbPost) {
      if ("redirectUrl" in dbPost) {
        redirect(dbPost.redirectUrl);
      }
      post = dbPost;
    }
  } catch (err: any) {
    if (err?.message === "NEXT_REDIRECT") throw err;
  }

  if (!post) {
    post = blogPosts.find((p) => p.slug === params.slug);
  }

  if (!post) notFound();

  // Related articles in same category or adjacent
  const relatedArticles = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Relevant equipment tailored to the topic
  const targetEquipmentSlugs = ["modular-ot", "modular-clean-room-doors", "bio-safety-cabinets", "dynamic-pass-box"];
  const relevantProducts = products
    .filter((p) => targetEquipmentSlugs.includes(p.slug))
    .slice(0, 4);

  // Fallback to top products if none matched
  const displayProducts = relevantProducts.length > 0 ? relevantProducts : products.slice(0, 4);

  // Extract headings from post content for Table of Contents
  const headings = Array.from(post.content.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi))
    .map((m) => {
      const text = decodeHtmlEntities(m[2].replace(/<[^>]+>/g, "").trim());
      return {
        level: parseInt(m[1]),
        text,
        id: text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
      };
    })
    .filter(h => h.text.length > 2 && h.text.length < 80);

  // Approximate word count and read time
  const wordCount = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 220));

  // Deduplicate featured hero image so it appears once as the main hero image without repetition in article body
  const cleanContent = removeDuplicateFeaturedImage(post.content, post.featuredImage);

  // Add IDs to headings for anchor targets while strictly preserving 100% of all content and images
  const inlineReplaced = cleanContent.replace(/https?:\/\/(?:www\.)?peterairs\.com\/wp-content\/uploads\/\d{4}\/\d{2}\/([^"'\s>]+)/g, (m, fn) => getValidBlogImage(fn));
  const contentWithHeadingIds = attachHeadingIds(inlineReplaced);

  return (
    <div className="w-full bg-white">
      <ArticleSchema
        title={decodeHtmlEntities(post.title)}
        description={post.excerpt}
        image={post.featuredImage}
        datePublished={post.date}
        url={post.canonicalUrl || `https://peterairs.com/blog/${post.slug}/`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog/` },
          { name: post.title, url: post.canonicalUrl || `https://peterairs.com/blog/${post.slug}/` },
        ]}
      />

      <PageBanner
        title={post.title}
        subtitle={decodeHtmlEntities(post.excerpt)}
        breadcrumbs={[{ label: "Blog", href: "/blog/" }, { label: decodeHtmlEntities(post.title) }]}
        bgImage="/images/ahu_banner.png"
      />

      {/* Main Content Container: Centered at 1260px desktop width with 28-32px column gap */}
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-[30px] items-start">
          
          {/* Main Article Column: Exactly 71% of available desktop width */}
          <article className="w-full lg:w-[calc(71%-15px)] shrink-0 min-w-0 space-y-7">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-600 border-b border-slate-200 pb-4">
              <span className="inline-flex items-center gap-1.5 font-bold text-brand-800 bg-brand-50 border border-brand-200/90 px-3 py-1 rounded-full">
                <Tag className="w-3.5 h-3.5 text-brand-700" />
                <span>{decodeHtmlEntities(post.categories[0] || "Cleanroom Engineering")}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                <Calendar className="w-4 h-4 text-brand-700" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                <Clock className="w-4 h-4 text-brand-700" />
                <span>{readTimeMinutes} min read</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-600 font-medium">
                <User className="w-4 h-4 text-brand-700" />
                <span>Peter Air Technical Team</span>
              </span>
            </div>

            {/* Featured Hero Image: Proportionate 16:9 full-width display */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <Image
                src={getValidBlogImage(post.featuredImage)}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 880px"
                className="object-cover"
              />
            </div>

            {/* Mobile / Inline Table of Contents */}
            {headings.length > 2 && (
              <div className="lg:hidden bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <ListTree className="w-4 h-4 text-brand-800" />
                    <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wide">
                      Table of Contents
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200/80 px-2 py-0.5 rounded">
                    {headings.length} sections
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {headings.map((h, i) => (
                    <li key={i} className={h.level === 3 ? "pl-4" : ""}>
                      <a
                        href={`#${h.id}`}
                        className="hover:text-brand-800 hover:underline transition font-medium flex items-center gap-1.5"
                      >
                        <span className="text-brand-600 font-bold">•</span>
                        <span>{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content: 100% original content and images preserved */}
            <div
              className="blog-article-content prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
            />

            {/* Engineering Quality & Authority Box */}
            <div className="mt-10 p-6 sm:p-7 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xs">
              <div className="p-3 bg-brand-800 text-white rounded-xl flex-shrink-0 shadow-xs">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 font-bold text-sm sm:text-base">
                    Published by Peter Air Systems Engineering Division
                  </strong>
                  <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 bg-brand-100 text-brand-900 rounded font-semibold">
                    ISO 9001:2015 & CE CERTIFIED
                  </span>
                </div>
                <p className="leading-relaxed">
                  We engineer, manufacture, and validate custom modular cleanroom structures, operation theatres, and HVAC airflow equipment. Have technical requirements or need custom sizing?{" "}
                  <Link href="/contact-peter-air-systems/" className="text-brand-800 font-bold hover:underline">
                    Consult our engineering department
                  </Link>.
                </p>
              </div>
            </div>

            {/* Related Reading Grid */}
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
                Related Engineering Guides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map((ra) => (
                  <Link
                    key={ra.slug}
                    href={`/blog/${ra.slug}/`}
                    className="group bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-brand-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-brand-700 block mb-1">
                        {new Date(ra.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-800 transition line-clamp-2">
                        {ra.title}
                      </h4>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-800 group-hover:translate-x-0.5 transition-transform">
                      <span>Read Technical Guide</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar Column: Exactly 29% of available desktop width, natural scroll with zero overlap */}
          <aside className="w-full lg:w-[calc(29%-15px)] shrink-0 space-y-6">
            {/* Card 1: Desktop Table of Contents (natural in-column flow) */}
            {headings.length > 2 && (
              <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ListTree className="w-4 h-4 text-brand-800 shrink-0" />
                    <h3 className="font-heading font-bold text-slate-900 text-sm tracking-tight uppercase">
                      Table of Contents
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-brand-700 bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded font-semibold">
                    {headings.length} sections
                  </span>
                </div>
                <nav className="space-y-1 pt-1 text-[13px]">
                  {headings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg text-slate-600 hover:text-brand-900 hover:bg-brand-50 transition-colors leading-snug ${
                        h.level === 3 ? "pl-5 text-slate-500 font-normal text-xs" : "font-medium text-slate-800"
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Card 2: Technical Consultation & RFQ Panel */}
            <BlogConsultationCard postTitle={post.title} />

            {/* Card 3: Relevant Equipment */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="font-heading font-bold text-slate-900 text-sm tracking-tight uppercase">
                  Related Equipment
                </h3>
                <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded uppercase">
                  In-House
                </span>
              </div>
              <div className="space-y-3">
                {displayProducts.map((p) => (
                  <div
                    key={p.slug}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/40 transition-colors"
                  >
                    <div className="relative h-13 w-13 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill sizes="52px" className="object-contain p-1" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate hover:text-brand-800">
                        <Link href={`/${p.slug}/`}>{p.title}</Link>
                      </h4>
                      <Link
                        href={`/${p.slug}/`}
                        className="text-[11px] font-semibold text-brand-700 hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        <span>View Specs</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Recent Technical Insights */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
              <h3 className="font-heading font-bold text-slate-900 text-sm tracking-tight uppercase border-b border-slate-100 pb-2.5">
                Recent Insights
              </h3>
              <div className="space-y-3">
                {relatedArticles.map((ra) => (
                  <div key={ra.slug} className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-[10px] font-mono text-brand-700 block mb-0.5 font-semibold">
                      {new Date(ra.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 hover:text-brand-800 line-clamp-2 leading-snug">
                      <Link href={`/blog/${ra.slug}/`}>{ra.title}</Link>
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
