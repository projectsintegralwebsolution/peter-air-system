import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Phone,
  FileCheck2,
  Layers
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { ProductCard } from "@/components/ProductCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { industries } from "@/data/industries";
import { products } from "@/data/products";
import { getIndustryBySlug, getAllProducts } from "@/lib/db";

export async function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  let ind: any = null;
  try {
    ind = await getIndustryBySlug(params.slug);
  } catch (e) {}
  if (!ind) ind = industries.find((i) => i.slug === params.slug);

  if (!ind) return { title: "Industries | Peter Air Systems" };

  return {
    title: `${ind.name} Cleanroom & HVAC Solutions | Peter Air Systems`,
    description: ind.description,
    alternates: {
      canonical: `https://peterairs.com/industries/${ind.slug}/`,
    },
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  let ind: any = null;
  try {
    ind = await getIndustryBySlug(params.slug);
  } catch (e) {}
  if (!ind) ind = industries.find((i) => i.slug === params.slug);

  if (!ind) notFound();

  let allProds = products;
  try {
    const dbProds = await getAllProducts();
    if (dbProds && dbProds.length > 0) allProds = dbProds as any;
  } catch (e) {}

  // Find products linked to this industry
  const indProducts = allProds.filter((p) => ind.products?.includes(p.slug));

  return (
    <div className="w-full bg-white">
      <PageBanner
        title={`${ind.name} Solutions`}
        subtitle={ind.tagline}
        breadcrumbs={[{ label: "Industries", href: "/industries/" }, { label: ind.name }]}
        bgImage={ind.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-brand-700 uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded inline-block">
              INDUSTRY REQUIREMENTS & REGULATORY STANDARDS
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Contamination Control Engineered for {ind.name}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {ind.description}
            </p>
          </div>

          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <Image
              src={ind.image}
              alt={ind.name}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Challenges vs Solutions Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Challenges */}
          <div className="bg-red-50/50 border border-red-200 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-2 text-red-900 font-bold text-base">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Core Environmental & Regulatory Challenges</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {ind.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Peter Air Solutions */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Peter Air Systems Engineered Mitigations</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {ind.solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Relevant Products */}
        {indProducts.length > 0 && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono font-bold text-brand-700 uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded inline-block mb-2">
                RECOMMENDED EQUIPMENT
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Certified Machinery for {ind.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {indProducts.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  categoryName={p.categoryName}
                  image={p.image}
                  description={p.overview}
                  applications={p.applications}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom RFQ CTA */}
        <div className="bg-brand-950 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono tracking-widest text-brand-300 uppercase">
              TECHNICAL CONSULTATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Designing or Upgrading a {ind.name} Facility?
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              Connect with our application engineering specialists to review airflow schematics, pressurization cascades, and equipment specifications tailored to your regulatory audit requirements.
            </p>
          </div>

          <div className="lg:col-span-6 bg-white text-slate-900 rounded-2xl p-6 shadow-xl">
            <EnquiryForm initialProduct={`${ind.name} Cleanroom System`} sourceContext={`Industry: ${ind.name}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
