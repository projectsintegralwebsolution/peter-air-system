"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { decodeHtmlEntities } from "@/lib/textUtils";

interface ProductCardProps {
  slug: string;
  title: string;
  categoryName?: string;
  image: string;
  description: string;
  applications?: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  slug,
  title,
  categoryName,
  image,
  description,
  applications = [],
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-[#063B5C]/40 before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[#D93636] before:opacity-0 hover:before:opacity-100 before:transition-opacity z-0">
      {/* Product Image Container */}
      <div className="relative h-56 w-full bg-white border-b border-slate-100 overflow-hidden flex items-center justify-center p-4">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
        <a
          href={getWhatsAppUrl(title)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Enquire about ${decodeHtmlEntities(title)} on WhatsApp`}
          aria-label={`Enquire about ${decodeHtmlEntities(title)} on WhatsApp`}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.871.812 2.796.813h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.181-2.587-5.768-5.768-5.768zm3.364 8.163c-.144.405-.837.774-1.171.823-.312.046-.713.067-1.157-.075-.27-.087-.619-.208-1.072-.403-1.895-.818-3.125-2.729-3.22-2.856-.095-.128-.769-1.025-.769-1.954 0-.93.486-1.386.66-1.576.174-.189.38-.237.507-.237.127 0 .253.002.365.007.118.006.277-.045.433.332.162.391.554 1.353.602 1.452.048.098.08.214.016.342-.064.127-.096.206-.191.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.388.111.19.493.813 1.057 1.315.727.646 1.34.847 1.53.942.19.095.317.143.365.222.048.079.048.459-.096.864z"/>
          </svg>
        </a>
        {categoryName && (
          <span className="absolute top-3 left-3 bg-[#063B5C] text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded shadow flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
            <span>{categoryName}</span>
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-800 transition line-clamp-1 mb-2">
          <Link href={`/${slug}/`}>{decodeHtmlEntities(title)}</Link>
        </h3>

        <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
          {decodeHtmlEntities(description)}
        </p>

        {/* Key Application Tag */}
        {applications.length > 0 && (
          <div className="mb-4 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
              Primary Application:
            </span>
            <span className="inline-block text-xs text-brand-900 font-medium bg-slate-50 border border-slate-200 border-l-2 border-l-[#D93636] px-2.5 py-0.5 rounded">
              {decodeHtmlEntities(applications[0])}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 mt-auto">
          <Link
            href={`/${slug}/`}
            className="group/btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:translate-x-0.5 transition-all" />
          </Link>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-brand-800 hover:bg-brand-900 transition shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={title}
        sourceContext={`Card: ${title}`}
      />
    </div>
  );
};
