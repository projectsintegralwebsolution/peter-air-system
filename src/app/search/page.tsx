"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, ArrowRight, Package, FileText, Layers, ShieldCheck, ChevronRight } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { blogPosts } from "@/data/blogs";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "products" | "categories" | "services" | "blogs">("all");

  useEffect(() => {
    if (initialQuery) {
      setSearchTerm(initialQuery);
    }
  }, [initialQuery]);

  const q = searchTerm.toLowerCase().trim();

  // Search products
  const matchingProducts = products.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.overview.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
  );

  // Search categories
  const matchingCategories = categories.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q)
  );

  // Search services
  const matchingServices = services.filter(
    (s) =>
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
  );

  // Search industries
  const matchingIndustries = industries.filter(
    (ind) =>
      !q ||
      ind.name.toLowerCase().includes(q) ||
      ind.description.toLowerCase().includes(q)
  );

  // Search blogs
  const matchingBlogs = blogPosts.filter(
    (b) =>
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q)
  );

  const totalResults =
    matchingProducts.length +
    matchingCategories.length +
    matchingServices.length +
    matchingIndustries.length +
    matchingBlogs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search e.g. Pass Box, HEPA Filter, AHU, Modular OT, Air Shower..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-brand-800 rounded-2xl text-base shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-500/20"
            autoFocus
          />
          <Search className="w-6 h-6 text-brand-700 absolute left-4 top-4" />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 mt-3 px-1">
          <span>
            Found <strong>{totalResults}</strong> result{totalResults !== 1 ? "s" : ""}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSearchTerm("Pass Box")}
              className="underline hover:text-brand-800"
            >
              Pass Box
            </button>
            •
            <button
              type="button"
              onClick={() => setSearchTerm("HEPA")}
              className="underline hover:text-brand-800"
            >
              HEPA
            </button>
            •
            <button
              type="button"
              onClick={() => setSearchTerm("AHU")}
              className="underline hover:text-brand-800"
            >
              AHU
            </button>
            •
            <button
              type="button"
              onClick={() => setSearchTerm("Air Shower")}
              className="underline hover:text-brand-800"
            >
              Air Shower
            </button>
          </div>
        </div>
      </div>

      {/* Tab Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "all"
              ? "bg-brand-800 text-white shadow"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All Results ({totalResults})
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "products"
              ? "bg-brand-800 text-white shadow"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Products ({matchingProducts.length})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "categories"
              ? "bg-brand-800 text-white shadow"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Categories & Solutions ({matchingCategories.length + matchingIndustries.length})
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "services"
              ? "bg-brand-800 text-white shadow"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Services ({matchingServices.length})
        </button>
        <button
          onClick={() => setActiveTab("blogs")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "blogs"
              ? "bg-brand-800 text-white shadow"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Articles ({matchingBlogs.length})
        </button>
      </div>

      {/* Results Container */}
      <div className="space-y-12">
        {(activeTab === "all" || activeTab === "products") && matchingProducts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-700" />
              <span>Cleanroom & HVAC Equipment ({matchingProducts.length})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingProducts.map((p) => (
                <div
                  key={p.slug}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 hover:shadow-lg transition group"
                >
                  <div className="relative h-20 w-20 bg-white border border-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={p.image} alt={p.title} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-grow min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-brand-700 uppercase block mb-1">
                        {p.categoryName}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-brand-800">
                        <Link href={`/${p.slug}/`}>{p.title}</Link>
                      </h4>
                    </div>
                    <Link
                      href={`/${p.slug}/`}
                      className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1 mt-2"
                    >
                      <span>View Technical Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "categories") && (matchingCategories.length > 0 || matchingIndustries.length > 0) && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-700" />
              <span>Categories & Industries</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchingCategories.map((c) => (
                <div key={c.slug} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Category Hub</span>
                  <h4 className="text-base font-bold text-slate-900 mt-1 hover:text-brand-800">
                    <Link href={`/${c.slug}/`}>{c.name}</Link>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{c.shortDescription}</p>
                  <Link href={`/${c.slug}/`} className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1 mt-2">
                    <span>Explore Category</span> →
                  </Link>
                </div>
              ))}
              {matchingIndustries.map((ind) => (
                <div key={ind.slug} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Industry Vertical</span>
                  <h4 className="text-base font-bold text-slate-900 mt-1 hover:text-brand-800">
                    <Link href={`/industries/${ind.slug}/`}>{ind.name}</Link>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{ind.description}</p>
                  <Link href={`/industries/${ind.slug}/`} className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1 mt-2">
                    <span>Explore Solutions</span> →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "services") && matchingServices.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-700" />
              <span>Engineering & Validation Services</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchingServices.map((s) => (
                <div key={s.slug} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="text-base font-bold text-slate-900 hover:text-brand-800">
                    <Link href="/services/">{s.name}</Link>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "blogs") && matchingBlogs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-700" />
              <span>Articles & Technical Publications ({matchingBlogs.length})</span>
            </h3>
            <div className="space-y-3">
              {matchingBlogs.slice(0, 15).map((b) => (
                <div key={b.slug} className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition">
                  <span className="text-[10px] font-mono text-brand-700 uppercase">
                    {b.categories[0]} • {new Date(b.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 hover:text-brand-800 mt-1">
                    <Link href={`/blog/${b.slug}/`}>{b.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{b.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="w-full bg-white">
      <PageBanner
        title="Search Engineering Catalog & Articles"
        subtitle="Search across our full range of cleanroom machinery, HVAC air handling units, filtration products, and technical articles."
        breadcrumbs={[{ label: "Search" }]}
        bgImage="/images/ahu_banner.png"
      />
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-slate-500">Loading catalog search...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
