import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Factory, CheckCircle2 } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { siteConfig } from "@/data/siteConfig";
import { industries } from "@/data/industries";
import { getAllIndustries } from "@/lib/db";

export const metadata: Metadata = {
  title: "Critical Cleanroom & HVAC Industries Served",
  description:
    "Explore specialized cleanroom equipment, pharmaceutical AHUs, and sterile airflow systems engineered for Pharmaceuticals, Biotechnology, Healthcare, Chemicals, and Electronics.",
  alternates: {
    canonical: "https://peterairs.com/industries/",
  },
  openGraph: {
    title: "Critical Cleanroom & HVAC Industries Served",
    description:
      "Explore specialized cleanroom equipment, pharmaceutical AHUs, and sterile airflow systems engineered for Pharmaceuticals, Biotechnology, Healthcare, Chemicals, and Electronics.",
    url: "https://peterairs.com/industries/",
    images: [{ url: "/images/Pharmaceuticals.jpg" }],
  },
};

export default async function IndustriesIndexPage() {
  let industryList = industries;
  try {
    const dbList = await getAllIndustries();
    if (dbList && dbList.length > 0) industryList = dbList as any;
  } catch (e) {}

  return (
    <div className="w-full bg-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Industries We Serve", url: `${siteConfig.url}/industries/` },
        ]}
      />
      <PageBanner
        title="Industries We Serve"
        subtitle="Specialized contamination control and precision air handling tailored for regulatory-compliant manufacturing environments."
        breadcrumbs={[{ label: "Industries" }]}
        bgImage="/images/Pharmaceuticals.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider bg-brand-50 border border-brand-200 px-3 py-1 rounded inline-block">
            CRITICAL SECTORS
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Tailored Engineering for Demanding Facilities
          </h2>
          <p className="text-slate-600 text-sm">
            Every sector possesses distinct contamination hazards, differential pressure rules, and humidity tolerances. Our custom engineering ensures 100% compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industryList.map((ind) => (
            <div
              key={ind.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-brand-500/50"
            >
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold text-white">{ind.name}</h3>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs font-mono font-semibold text-brand-700 uppercase mb-2">
                  {ind.tagline}
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {ind.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/industries/${ind.slug}/`}
                    className="text-xs font-bold text-brand-800 group-hover:text-brand-900 flex items-center gap-1 hover:underline"
                  >
                    <span>View Technical Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
