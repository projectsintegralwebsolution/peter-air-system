import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag, Search, Clock, ChevronLeft, ChevronRight, BookOpen, Layers } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { blogPosts } from "@/data/blogs";
import { decodeHtmlEntities } from "@/lib/textUtils";
import { getPublishedBlogs } from "@/lib/db";

export const metadata: Metadata = {
  title: "Cleanroom & HVAC Engineering Technical Blog",
  description:
    "Explore technical guides, cleanroom design insights, HVAC calculations, HEPA filtration standards, and GMP compliance articles from Peter Air Systems.",
  alternates: {
    canonical: "https://peterairs.com/blog/",
  },
  openGraph: {
    title: "Cleanroom & HVAC Engineering Technical Blog",
    description:
      "Explore technical guides, cleanroom design insights, HVAC calculations, HEPA filtration standards, and GMP compliance articles from Peter Air Systems.",
    url: "https://peterairs.com/blog/",
    images: [{ url: "/images/ahu_banner.png" }],
    type: "website",
  },
};

const POSTS_PER_PAGE = 12;

interface BlogListingPageProps {
  searchParams?: {
    q?: string;
    category?: string;
    page?: string;
  };
}

export default async function BlogListingPage({ searchParams }: BlogListingPageProps) {
  const query = searchParams?.q?.trim().toLowerCase() || "";
  const selectedCat = searchParams?.category?.trim() || "";
  const currentPage = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);

  // Load from database with seamless fallback
  let sourcePosts = blogPosts;
  try {
    const dbData = await getPublishedBlogs({ limit: 1000 });
    if (dbData && dbData.posts && dbData.posts.length > 0) {
      sourcePosts = dbData.posts as any;
    }
  } catch (e) {
    // Fall back to static blogPosts
  }

  // Available primary categories
  const categoriesList = [
    "Cleanroom Components",
    "Cleanroom Furniture",
    "Contamination Control",
    "HVAC Systems",
    "Industry Solutions",
  ];

  // Filter posts
  const filtered = sourcePosts.filter((post) => {
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query);

    const matchesCat =
      !selectedCat ||
      (post.categories && post.categories.some((c) => c.toLowerCase() === selectedCat.toLowerCase()));

    return matchesQuery && matchesCat;
  });

  const totalPosts = filtered.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE) || 1;
  const safePage = Math.min(currentPage, totalPages);

  // Determine if featured spotlight hero card should be displayed:
  // Only on Page 1 when no search query and no category filter are active
  const showFeaturedHero = safePage === 1 && !query && !selectedCat && filtered.length > 0;
  const featuredPost = showFeaturedHero ? filtered[0] : null;

  // Items to display in the grid
  const gridPosts = showFeaturedHero
    ? filtered.slice(1, 1 + POSTS_PER_PAGE)
    : filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  // Calculate display range
  const rangeStart = showFeaturedHero
    ? 1
    : totalPosts === 0
    ? 0
    : (safePage - 1) * POSTS_PER_PAGE + 1;
  const rangeEnd = showFeaturedHero
    ? Math.min(1 + gridPosts.length, totalPosts)
    : Math.min(safePage * POSTS_PER_PAGE, totalPosts);

  // Helper to build pagination links
  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCat) params.set("category", selectedCat);
    if (pageNum > 1) params.set("page", pageNum.toString());
    const qs = params.toString();
    return qs ? `/blog/?${qs}` : "/blog/";
  };

  // Generate pagination page numbers array with ellipses
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("...");
      const start = Math.max(2, safePage - 1);
      const end = Math.min(totalPages - 1, safePage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* 1. Page Banner */}
      <PageBanner
        title="Technical Insights & Knowledge Base"
        subtitle="Comprehensive engineering guides on pharmaceutical cleanrooms, AHU sizing, HEPA filtration standards, and GMP compliance."
        breadcrumbs={[{ label: "Blog" }]}
      />

      {/* 2. Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-grow w-full">
        {/* Search & Category Filter Toolbar */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-10 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <form method="GET" action="/blog/" className="relative w-full md:w-96">
              {selectedCat && <input type="hidden" name="category" value={selectedCat} />}
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search cleanroom & HVAC guides..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </form>

            {/* Results Counter Summary */}
            <div className="text-xs sm:text-sm text-slate-500 font-medium">
              <span>
                Showing <strong className="text-slate-800">{totalPosts}</strong> published engineering guides
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 font-semibold mr-1">TOPICS:</span>
            <Link
              href={query ? `/blog/?q=${encodeURIComponent(query)}` : "/blog/"}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                !selectedCat
                  ? "bg-brand-800 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              All Articles ({blogPosts.length})
            </Link>

            {categoriesList.map((cat) => {
              const count = blogPosts.filter((p) =>
                p.categories?.some((c) => c.toLowerCase() === cat.toLowerCase())
              ).length;
              const isActive = selectedCat.toLowerCase() === cat.toLowerCase();

              const catUrl = new URLSearchParams();
              if (query) catUrl.set("q", query);
              catUrl.set("category", cat);

              return (
                <Link
                  key={cat}
                  href={`/blog/?${catUrl.toString()}`}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    isActive
                      ? "bg-brand-800 text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{cat}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? "bg-brand-900 text-brand-200" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3. Featured Spotlight Article (Page 1 Default) */}
        {featuredPost && (
          <div className="mb-14">
            <div className="bg-gradient-to-br from-brand-950 to-brand-900 rounded-3xl overflow-hidden shadow-xl border border-brand-800 grid grid-cols-1 lg:grid-cols-12 text-white group">
              <div className="relative h-64 sm:h-80 lg:h-auto lg:col-span-7 bg-slate-900 overflow-hidden">
                <Image
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-800/90 text-white text-[11px] font-mono tracking-wider px-3 py-1 rounded-md shadow-md uppercase font-semibold">
                  FEATURED GUIDE
                </div>
              </div>

              <div className="p-7 sm:p-10 lg:p-12 lg:col-span-5 flex flex-col justify-center space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-brand-300">
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-200 bg-brand-800/60 px-2.5 py-0.5 rounded border border-brand-700/60">
                    <Tag className="w-3 h-3 text-brand-300" />
                    <span>{featuredPost.categories[0] || "Cleanroom Engineering"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-slate-300">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-brand-300 transition-colors">
                  <Link href={`/blog/${featuredPost.slug}/`}>{decodeHtmlEntities(featuredPost.title)}</Link>
                </h2>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {decodeHtmlEntities(featuredPost.excerpt)}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/blog/${featuredPost.slug}/`}
                    className="inline-flex items-center gap-2 bg-white text-brand-950 hover:bg-brand-50 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md group-hover:translate-x-0.5"
                  >
                    <span>Read Technical Guide</span>
                    <ArrowRight className="w-4 h-4 text-brand-800" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Articles Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => {
              const displayCategory =
                post.categories && post.categories.length > 0 && post.categories[0] !== "Blog" && post.categories[0] !== "Uncategorized"
                  ? post.categories[0]
                  : "Cleanroom & HVAC";

              return (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brand-500/50"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      className="object-cover group-hover:scale-104 transition-transform duration-400"
                    />
                    <div className="absolute top-3 left-3 bg-brand-900/90 text-white text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded shadow-sm uppercase font-semibold">
                      {displayCategory}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-brand-700" />
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-brand-800 transition-colors">
                      <Link href={`/blog/${post.slug}/`}>{decodeHtmlEntities(post.title)}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed flex-grow">
                      {decodeHtmlEntities(post.excerpt)}
                    </p>

                    <div className="pt-3 border-t border-slate-100 mt-auto flex items-center justify-between">
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="text-xs font-bold text-brand-800 group-hover:text-brand-600 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>Read Technical Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 my-10">
            <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto text-brand-800 shadow-xs">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching technical guides found</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We could not find any articles matching “<span className="font-semibold text-slate-800">{query || selectedCat}</span>”.
              Try adjusting your search terms or view our complete catalog.
            </p>
            <div className="pt-2">
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
              >
                <span>Reset All Filters</span>
              </Link>
            </div>
          </div>
        )}

        {/* 5. Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-500 font-medium">
              Showing <strong className="text-slate-800">{rangeStart}–{rangeEnd}</strong> of{" "}
              <strong className="text-slate-800">{totalPosts}</strong> publications (Page {safePage} of {totalPages})
            </div>

            <nav aria-label="Blog Pagination" className="flex items-center gap-1.5">
              {/* Previous Page */}
              {safePage > 1 ? (
                <Link
                  href={createPageUrl(safePage - 1)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition shadow-2xs"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </Link>
              ) : (
                <span className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 text-xs font-semibold flex items-center gap-1 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </span>
              )}

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {generatePageNumbers().map((num, idx) => {
                  if (num === "...") {
                    return (
                      <span key={`dots-${idx}`} className="px-2 text-slate-400 text-xs font-bold">
                        …
                      </span>
                    );
                  }

                  const pageNum = num as number;
                  const isActive = pageNum === safePage;

                  return (
                    <Link
                      key={pageNum}
                      href={createPageUrl(pageNum)}
                      className={`min-w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition ${
                        isActive
                          ? "bg-brand-800 text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>

              {/* Next Page */}
              {safePage < totalPages ? (
                <Link
                  href={createPageUrl(safePage + 1)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition shadow-2xs"
                  aria-label="Next Page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 text-xs font-semibold flex items-center gap-1 cursor-not-allowed">
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
