import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-950 text-slate-300 border-t border-brand-900/80 pt-16 pb-16 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-900/60">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-4 group focus:outline-none">
              <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-lg border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-cyan-500/10 transition-shadow">
                <Image
                  src="/images/PETER-AIR-LOGO.png"
                  alt="Peter Air Systems - Precision Engineering Logo"
                  width={70}
                  height={80}
                  className="h-14 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white leading-none group-hover:text-brand-300 transition-colors">
                  PETER AIR
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-400 uppercase leading-tight mt-1 sm:mt-1.5">
                  SYSTEMS
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-300 mt-1 font-semibold">
                  ISO 9001:2015 & CE CERTIFIED
                </span>
              </div>
            </Link>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Peter Air Systems is India's premier ISO 9001:2015 and CE-certified manufacturer of custom Air Handling Units (AHU), Cleanroom Equipment, Air Filters, and Turnkey Modular Operation Theatres for pharmaceutical, biotech, healthcare, and semiconductor cleanrooms.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-medium text-brand-300">
              <span className="bg-brand-900/60 border border-brand-800 text-slate-200 px-2.5 py-1 rounded">
                ISO 9001:2015
              </span>
              <span className="bg-brand-900/60 border border-brand-800 text-slate-200 px-2.5 py-1 rounded">
                CE CERTIFIED
              </span>
              <span className="bg-brand-900/60 border border-brand-800 text-slate-200 px-2.5 py-1 rounded">
                GMP COMPLIANT
              </span>
              <span className="bg-brand-900/60 border border-brand-800 text-slate-200 px-2.5 py-1 rounded">
                PAN-INDIA DELIVERY
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider pb-1.5">
                Quick Navigation
              </h4>
              <div className="w-6 h-0.5 bg-[#D93636] rounded-full" />
            </div>
            <ul className="space-y-2 text-xs sm:text-sm pt-1">
              <li>
                <Link href="/" className="group text-slate-300 hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-400 group-hover:text-[#D93636] transition" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about-us-peter-air-systems/" className="group text-slate-300 hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-400 group-hover:text-[#D93636] transition" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/services/" className="group text-slate-300 hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-400 group-hover:text-[#D93636] transition" /> Solutions & Services
                </Link>
              </li>
              <li>
                <Link href="/industries/" className="group text-slate-300 hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-400 group-hover:text-[#D93636] transition" /> Industries We Serve
                </Link>
              </li>
              <li>
                <Link href="/certifications-peter-air-systems-iso-ce-certified-solutions/" className="group text-slate-300 hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-400 group-hover:text-[#D93636] transition" /> ISO & CE Quality
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="group text-slate-300 hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-400 group-hover:text-[#D93636] transition" /> Technical Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-peter-air-systems/" className="group text-slate-300 hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-400 group-hover:text-[#D93636] transition" /> Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Products */}
          <div className="space-y-3">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider pb-1.5">
                Key Equipment
              </h4>
              <div className="w-6 h-0.5 bg-[#D93636] rounded-full" />
            </div>
            <ul className="space-y-2 text-xs sm:text-sm pt-1">
              <li>
                <Link href="/air-handling-unit-ahu/" className="text-slate-300 hover:text-white transition block">
                  Air Handling Unit (AHU)
                </Link>
              </li>
              <li>
                <Link href="/static-pass-box/" className="text-slate-300 hover:text-white transition block">
                  Static Pass Box
                </Link>
              </li>
              <li>
                <Link href="/dynamic-pass-box/" className="text-slate-300 hover:text-white transition block">
                  Dynamic Pass Box
                </Link>
              </li>
              <li>
                <Link href="/air-shower/" className="text-slate-300 hover:text-white transition block">
                  Air Shower
                </Link>
              </li>
              <li>
                <Link href="/bio-safety-cabinets/" className="text-slate-300 hover:text-white transition block">
                  Bio Safety Cabinets
                </Link>
              </li>
              <li>
                <Link href="/hepa-filter/" className="text-slate-300 hover:text-white transition block">
                  HEPA Filters (H13/H14)
                </Link>
              </li>
              <li>
                <Link href="/modular-ot/" className="text-slate-300 hover:text-white transition block">
                  Modular Operation Theatre
                </Link>
              </li>
              <li>
                <Link href="/modular-clean-room-doors/" className="text-slate-300 hover:text-white transition block">
                  Modular Clean Room Doors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Coordinates */}
          <div className="space-y-3">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider pb-1.5">
                Contact Factory
              </h4>
              <div className="w-6 h-0.5 bg-[#D93636] rounded-full" />
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {siteConfig.contact.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`} className="text-white hover:text-brand-300 block font-medium">
                    {siteConfig.contact.phonePrimary}
                  </a>
                  <a href={`tel:${siteConfig.contact.phoneSecondary.replace(/\s+/g, '')}`} className="hover:text-white block text-xs text-slate-400">
                    {siteConfig.contact.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <a href={`mailto:${siteConfig.contact.emailSales}`} className="hover:text-white block">
                    {siteConfig.contact.emailSales}
                  </a>
                  <a href={`mailto:${siteConfig.contact.emailDirect}`} className="hover:text-white block text-xs text-slate-400">
                    {siteConfig.contact.emailDirect}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>{siteConfig.contact.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Mandatory Agency Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
            </p>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link href="/privacy-policy/" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/peter-terms-of-service/" className="hover:text-white transition">
              Terms of Service
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/disclaimer/" className="hover:text-white transition">
              Disclaimer
            </Link>
          </div>

          {/* MANDATORY CREDIT AS SPECIFIED IN PROMPT */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Developed by</span>
            <a
              href={siteConfig.footerCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-300 font-semibold underline underline-offset-4 decoration-brand-400 transition"
            >
              Integral Web Solution
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
