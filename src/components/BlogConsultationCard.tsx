"use client";

import React, { useState } from "react";
import { Phone, FileText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { EnquiryModal } from "./EnquiryModal";

interface BlogConsultationCardProps {
  postTitle: string;
}

export const BlogConsultationCard: React.FC<BlogConsultationCardProps> = ({ postTitle }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-br from-brand-950 to-brand-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-brand-800 space-y-4">
        <span className="text-[11px] tracking-wider text-brand-300 uppercase font-semibold inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
          <span>ENGINEERING CONSULTATION</span>
        </span>
        <h3 className="text-xl font-bold text-white leading-snug">
          Need Cleanroom or Modular OT Advice?
        </h3>
        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
          Discuss your facility layout, NABH/GMP compliance, and HVAC equipment sizing directly with our application engineers in Mumbai.
        </p>

        <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
          <a
            href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`}
            className="w-full flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-700 text-white py-3 px-4 rounded-xl font-semibold transition shadow-sm"
          >
            <Phone className="w-4 h-4 text-brand-300" />
            <span>Call {siteConfig.contact.phonePrimary}</span>
          </a>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white text-brand-950 hover:bg-slate-100 py-3 px-4 rounded-xl font-bold transition shadow-sm"
          >
            <FileText className="w-4 h-4 text-brand-800" />
            <span>Request Project Quotation</span>
          </button>
        </div>

        <div className="pt-2 border-t border-brand-800/80 flex items-center gap-2 text-[11px] text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>ISO 9001:2015 & CE Certified Factory</span>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={postTitle}
        sourceContext={`Blog Detail: ${postTitle}`}
      />
    </>
  );
};
