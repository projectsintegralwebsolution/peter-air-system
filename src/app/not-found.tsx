import React from "react";
import Link from "next/link";
import { Search, Home, ArrowRight, ShieldAlert, Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 bg-brand-50 border border-brand-200 text-brand-800 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-semibold tracking-wider text-brand-700 uppercase">
            STATUS 404 • SPECIFICATION NOT FOUND
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            Page or Equipment Relocated
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            The page you are attempting to access has either moved or been updated in our new catalog structure. Please use our search or browse our primary equipment categories below.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700 pt-2 text-left">
          <Link href="/air-handling-unit-ahu/" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <span>Air Handling Units</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-700" />
          </Link>
          <Link href="/clean-room-equipment/" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <span>Cleanroom Equipment</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-700" />
          </Link>
          <Link href="/air-filters/" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <span>HEPA Air Filters</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-700" />
          </Link>
          <Link href="/cleanroom-turnkey-solution/" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
            <span>Modular Cleanrooms</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-700" />
          </Link>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-800 text-white font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-brand-900 transition shadow"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/search/"
            className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-200 transition"
          >
            <Search className="w-4 h-4" />
            <span>Search Equipment</span>
          </Link>
        </div>

        <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-brand-700" />
          <span>Need immediate assistance? Call </span>
          <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`} className="font-bold text-brand-800 hover:underline">
            {siteConfig.contact.phonePrimary}
          </a>
        </div>
      </div>
    </div>
  );
}
