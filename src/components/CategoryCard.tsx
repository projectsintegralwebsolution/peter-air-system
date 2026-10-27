"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";
import { decodeHtmlEntities } from "@/lib/textUtils";

interface CategoryCardProps {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  featuredImage: string;
  productCount: number;
  primaryApplication?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  slug,
  name,
  shortDescription,
  featuredImage,
  productCount,
  primaryApplication,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full hover:border-[#063B5C]/40 before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[#D93636] before:opacity-0 hover:before:opacity-100 before:transition-opacity z-0">
      {/* 1. Dedicated Image Container with Badges */}
      <div className="relative h-60 sm:h-64 w-full bg-white border-b border-slate-100 overflow-hidden flex items-center justify-center p-6">
        <Image
          src={featuredImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge at top left with brand-red dot */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#063B5C] text-white text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded-md shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
            <span>{name}</span>
          </span>
        </div>

        {/* Existing Product Count Badge at top right */}
        {productCount > 0 && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center bg-white/95 text-slate-700 border border-slate-200/90 text-[10.5px] font-medium px-2 py-0.5 rounded shadow-2xs backdrop-blur-xs">
              {productCount} Products
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content Area */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Category Title clearly below the image */}
        <h3 className="font-heading font-bold text-[19px] sm:text-xl text-[#063B5C] group-hover:text-brand-700 transition leading-snug mb-2 line-clamp-1">
          <Link href={`/${slug}/`}>{decodeHtmlEntities(name)}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
          {decodeHtmlEntities(shortDescription)}
        </p>

        {/* 3. Primary Application Highlight Box with red accent border */}
        {primaryApplication && (
          <div className="mb-4 pt-3 border-t border-slate-100">
            <span className="text-[10.5px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
              PRIMARY APPLICATION:
            </span>
            <div className="bg-sky-50/80 border border-sky-100/90 border-l-2 border-l-[#D93636] rounded-lg p-2.5 text-xs text-[#063B5C] font-semibold leading-snug">
              {decodeHtmlEntities(primaryApplication)}
            </div>
          </div>
        )}

        {/* 4. Action Buttons (View Details + Enquire Now) */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 mt-auto">
          {/* Button 1: View Details */}
          <Link
            href={`/${slug}/`}
            className="group/btn flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 active:scale-[0.98] transition"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 transition-all" />
          </Link>

          {/* Button 2: Enquire Now */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-[#063B5C] hover:bg-[#084b75] active:scale-[0.98] transition shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>

      {/* Existing Functional Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={name}
        sourceContext={`Category Card: ${name}`}
      />
    </div>
  );
};
