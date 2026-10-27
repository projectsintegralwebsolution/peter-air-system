"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  Settings,
  Headphones,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { EnquiryForm } from "./EnquiryForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  sourceContext?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  productName = "",
  sourceContext = "Modal",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden flex flex-col md:flex-row my-auto max-h-[96vh] md:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 z-30 p-1.5 text-slate-400 hover:text-slate-700 bg-white/90 hover:bg-slate-100 rounded-full shadow-xs transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Deep Navy Value Proposition Panel */}
        <div className="hidden md:flex md:w-[320px] lg:w-[340px] shrink-0 bg-[#073048] text-white p-6 lg:p-7 flex-col justify-between relative overflow-y-auto max-h-full border-r border-slate-700/40">
          {/* Subtle background glow effect */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top content */}
          <div className="relative z-10">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="bg-white p-1 rounded-lg shrink-0 flex items-center justify-center shadow-xs">
                <Image
                  src="/images/PETER-AIR-LOGO.png"
                  alt="Peter Air Systems Logo"
                  width={60}
                  height={70}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black tracking-tight text-white text-base leading-none">
                  PETER AIR
                </span>
                <span className="font-bold tracking-[0.2em] text-cyan-300 uppercase text-[9px] mt-0.5">
                  SYSTEMS
                </span>
                <span className="text-[9.5px] text-slate-300 italic mt-0.5">
                  Perfect Air. Better Tomorrow.
                </span>
              </div>
            </div>

            {/* Title Section */}
            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-300 block mb-1">
                REQUEST TECHNICAL
              </span>
              <h2 id="enquiry-modal-title" className="font-heading font-black text-2xl lg:text-[26px] text-white tracking-tight leading-tight">
                Quotation / RFP
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                Share your requirements and our experts will get back with a tailored solution and quotation.
              </p>
            </div>

            {/* 4 Feature Highlights with circular cyan outline icons */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs text-white leading-tight">Customized Solutions</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">As per your project needs</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs text-white leading-tight">Expert Support</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">From selection to installation</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs text-white leading-tight">Quick Response</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">Get a detailed quotation</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs text-white leading-tight">NDA & Privacy Protected</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">Your information is secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom AHU Cleanroom Image */}
          <div className="relative mt-6 rounded-xl overflow-hidden border border-cyan-500/20 shadow-md h-32 lg:h-36 w-full shrink-0">
            <Image
              src="/images/Air-handling-unit-.jpg"
              alt="Air Handling Unit & Cleanroom Equipment"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="flex-1 min-w-0 p-4 sm:p-5 lg:p-6 pb-6 sm:pb-8 lg:pb-8 overflow-y-auto max-h-[96vh] md:max-h-[92vh]">
          <EnquiryForm
            initialProduct={productName}
            sourceContext={sourceContext}
            isModal={true}
            onSuccess={() => {
              setTimeout(() => {
                onClose();
              }, 4000);
            }}
          />
        </div>
      </div>
    </div>
  );
};
