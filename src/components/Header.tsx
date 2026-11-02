"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  Search,
  ArrowRight,
  ShieldCheck,
  Layers,
  Wind,
  Filter,
  SlidersHorizontal,
  FileText,
  Sparkles,
  CheckCircle2,
  FlaskConical,
  Leaf,
  Zap,
  Shield,
  Settings,
  Headphones,
  Clock,
  MapPin,
  Award,
  Building2,
  DoorClosed,
  Cross
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { categories } from "@/data/categories";
import { EnquiryModal } from "./EnquiryModal";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>("cleanroom-equip");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
      megaMenuTimerRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 180);
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-brand-950 text-slate-200 text-xs border-b border-brand-900/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-200">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D93636] animate-pulse"></span>
              ISO 9001:2015 & CE Certified Cleanroom & HVAC Manufacturer
            </span>
            <span className="text-slate-500">|</span>
            <a
              href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>{siteConfig.contact.phonePrimary}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.emailSales}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition"
            >
              <Mail className="w-3.5 h-3.5 text-brand-400" />
              <span>{siteConfig.contact.emailSales}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/certifications-peter-air-systems-iso-ce-certified-solutions/" className="text-slate-200 hover:text-white transition">
              Certifications
            </Link>
            <span className="text-slate-500">•</span>
            <Link href="/search/" className="flex items-center gap-1 text-slate-200 hover:text-white transition">
              <Search className="w-3.5 h-3.5 text-brand-400" />
              <span>Search Products</span>
            </Link>
            <span className="text-slate-500">•</span>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-emerald-400 font-semibold transition"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full relative transition-all duration-300 bg-white border-b ${
          isScrolled
            ? "py-2.5 shadow-md border-slate-200"
            : "py-4 border-slate-100 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group focus:outline-none shrink-0 py-0.5">
            <div className="relative flex-shrink-0 flex items-center justify-center">
              <Image
                src="/images/PETER-AIR-LOGO.png"
                alt="Peter Air Systems - Precision HVAC & Cleanroom Solutions"
                width={70}
                height={80}
                priority
                className={`w-auto object-contain transition-all duration-200 group-hover:scale-105 ${
                  isScrolled ? "h-11 sm:h-13" : "h-14 sm:h-16"
                }`}
              />
            </div>
            <div className="flex flex-col justify-center select-none">
              <span className={`font-heading font-black tracking-tight text-brand-950 leading-none group-hover:text-brand-800 transition-colors ${
                isScrolled ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              }`}>
                PETER AIR
              </span>
              <span className={`font-bold tracking-[0.24em] text-brand-700 uppercase leading-tight ${
                isScrolled ? "text-[10px] sm:text-[11px] mt-0.5" : "text-[11px] sm:text-[12px] mt-1"
              }`}>
                SYSTEMS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-slate-700">
            <Link href="/" className="hover:text-brand-900 transition py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D93636] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
              Home
            </Link>

            <Link href="/about-us-peter-air-systems/" className="hover:text-brand-900 transition py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D93636] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
              About
            </Link>

            {/* Products Dropdown / Mega Menu Trigger */}
            <div
              ref={megaMenuRef}
              className=""
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 transition py-2 focus:outline-none relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D93636] ${
                  megaMenuOpen ? "text-brand-900 font-semibold after:scale-x-100" : "hover:text-brand-900 after:scale-x-0 hover:after:scale-x-100"
                } after:transition-transform`}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    megaMenuOpen ? "rotate-180 text-brand-700" : ""
                  }`}
                />
              </button>

              {/* Redesigned & Optimized Products Mega Menu */}
              {megaMenuOpen && (
                <div className="absolute left-0 right-0 top-full pt-1.5 px-4 sm:px-6 lg:px-8 z-50 flex justify-center pointer-events-none">
                  <div className="w-full max-w-[1240px] pointer-events-auto">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-fade-in ring-1 ring-slate-900/5 max-h-[calc(100vh-85px)] flex flex-col">
                      {/* Scrollable Container if viewport is very short */}
                      <div className="overflow-y-auto overflow-x-hidden p-4 sm:p-5 flex flex-col gap-3.5">
                        
                        {/* Top Navy Banner Strip */}
                        <div className="relative rounded-xl bg-[#073650] overflow-hidden px-4 sm:px-5 py-2.5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-white shadow-sm shrink-0">
                          <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
                            <Image
                              src="/images/ahu_banner.png"
                              alt="HVAC Banner"
                              fill
                              className="object-cover object-right"
                            />
                          </div>

                          {/* Left Title & Tag */}
                          <div className="relative z-10 min-w-0">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[11px] font-semibold tracking-wider uppercase mb-1">
                              <span>PRODUCTS</span>
                            </div>
                            <h3 className="font-heading font-bold text-[18px] text-white tracking-tight leading-snug">
                              High-Performance HVAC & Cleanroom Solutions
                            </h3>
                            <p className="text-[13px] text-slate-300 font-medium">
                              Engineered for precision. Designed for a cleaner tomorrow.
                            </p>
                          </div>

                          {/* Right Badges */}
                          <div className="relative z-10 flex flex-wrap items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs border border-white/15 px-2.5 py-1 rounded-full text-xs text-white">
                              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="font-medium text-[12.5px] whitespace-nowrap">High Efficiency</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs border border-white/15 px-2.5 py-1 rounded-full text-xs text-white">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              <span className="font-medium text-[12.5px] whitespace-nowrap">Energy Saving</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs border border-white/15 px-2.5 py-1 rounded-full text-xs text-white">
                              <Shield className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="font-medium text-[12.5px] whitespace-nowrap">Reliable Performance</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs border border-white/15 px-2.5 py-1 rounded-full text-xs text-white">
                              <Settings className="w-3.5 h-3.5 text-blue-300" />
                              <span className="font-medium text-[12.5px] whitespace-nowrap">Custom Solutions</span>
                            </div>
                          </div>
                        </div>

                        {/* Middle Content: 5 Product Columns + Right Sidebar */}
                        <div className="flex flex-col lg:flex-row gap-3.5 items-stretch">
                          {/* 5 Product Columns Grid */}
                          <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 xl:gap-3">
                            
                            {/* Col 1: Air Handling & HVAC */}
                            <div className="flex flex-col justify-between h-full bg-slate-50/40 p-2 rounded-xl border border-slate-100">
                              <div className="flex flex-col">
                                <Link
                                  href="/air-handling-unit-ahu/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="flex items-center justify-between p-1.5 rounded-lg bg-blue-50/80 border border-blue-100 hover:bg-blue-100/80 transition group mb-2"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                      <SlidersHorizontal className="w-3 h-3" />
                                    </span>
                                    <span className="font-heading font-bold text-[13px] tracking-tight text-slate-900 group-hover:text-blue-900 leading-tight">
                                      Air Handling & HVAC
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                                </Link>

                                <ul className="space-y-0.5 text-[13.5px] text-slate-600 font-medium mb-2">
                                  <li>
                                    <Link
                                      href="/air-handling-unit-ahu/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Air Handling Unit (AHU)
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/air-washer-unit/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Air Washer Unit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/dehumidifier-unit/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Dehumidifier Unit
                                    </Link>
                                  </li>
                                </ul>

                                <Link
                                  href="/air-handling-unit-ahu/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="inline-flex items-center gap-1 text-[12.5px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-2 py-0.5 rounded-full mb-2.5 transition w-fit"
                                >
                                  <span>View AHU Systems</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>

                              <div className="mt-auto relative h-20 rounded-lg overflow-hidden border border-slate-200/80 bg-slate-100 shadow-2xs group shrink-0">
                                <Image
                                  src="/images/Air-handling-unit-.jpg"
                                  alt="Air Handling Unit"
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </div>

                            {/* Col 2: Cleanroom Equipment */}
                            <div className="flex flex-col justify-between h-full bg-slate-50/40 p-2 rounded-xl border border-slate-100">
                              <div className="flex flex-col">
                                <Link
                                  href="/clean-room-equipment/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-50/80 border border-emerald-100 hover:bg-emerald-100/80 transition group mb-2"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                      <ShieldCheck className="w-3 h-3" />
                                    </span>
                                    <span className="font-heading font-bold text-[13px] tracking-tight text-slate-900 group-hover:text-emerald-900 leading-tight">
                                      Cleanroom Equipment
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition shrink-0" />
                                </Link>

                                <ul className="space-y-0.5 text-[13.5px] text-slate-600 font-medium mb-2">
                                  <li>
                                    <Link
                                      href="/air-shower/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Air Shower
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/static-pass-box/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Static Pass Box
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/dynamic-pass-box/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Dynamic Pass Box
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/bio-safety-cabinets/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Bio Safety Cabinets
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/laminar-work-stations/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Laminar Work Stations
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/dispensing-booth/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Dispensing Booth
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/garment-cabinet/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Garment Cabinet
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/reverse-laminar-flow-unit/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Reverse Laminar Flow Unit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/other-products-laboratory-equipment/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Other Products / Lab
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              <Link
                                href="/clean-room-equipment/"
                                onClick={() => setMegaMenuOpen(false)}
                                className="inline-flex items-center gap-1 text-[12.5px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2 py-0.5 rounded-full mt-auto transition w-fit"
                              >
                                <span>View All Cleanroom</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>

                            {/* Col 3: Air Filters */}
                            <div className="flex flex-col justify-between h-full bg-slate-50/40 p-2 rounded-xl border border-slate-100">
                              <div className="flex flex-col">
                                <Link
                                  href="/air-filters/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="flex items-center justify-between p-1.5 rounded-lg bg-purple-50/80 border border-purple-100 hover:bg-purple-100/80 transition group mb-2"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                      <Filter className="w-3 h-3" />
                                    </span>
                                    <span className="font-heading font-bold text-[13px] tracking-tight text-slate-900 group-hover:text-purple-900 leading-tight">
                                      Air Filters
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition shrink-0" />
                                </Link>

                                <ul className="space-y-0.5 text-[13.5px] text-slate-600 font-medium mb-2">
                                  <li>
                                    <Link
                                      href="/enhance-air-quality-with-pre-filters/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Pre Filters (G3/G4)
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/fine-filter/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Fine Filter (F7/F9)
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/hepa-filter/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      HEPA Filter (H13/H14)
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/mini-pleat-hepa-filter/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Mini Pleat HEPA Filter
                                    </Link>
                                  </li>
                                </ul>

                                <Link
                                  href="/air-filters/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="inline-flex items-center gap-1 text-[12.5px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 px-2 py-0.5 rounded-full mb-2.5 transition w-fit"
                                >
                                  <span>View All Filters</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>

                              <div className="mt-auto relative h-20 rounded-lg overflow-hidden border border-slate-200/80 bg-slate-100 shadow-2xs group shrink-0">
                                <Image
                                  src="/images/pre-filter.jpg"
                                  alt="Air Filters"
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </div>

                            {/* Col 4: HVAC Distribution */}
                            <div className="flex flex-col justify-between h-full bg-slate-50/40 p-2 rounded-xl border border-slate-100">
                              <div className="flex flex-col">
                                <Link
                                  href="/hvac-products/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="flex items-center justify-between p-1.5 rounded-lg bg-amber-50/80 border border-amber-100 hover:bg-amber-100/80 transition group mb-2"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                      <SlidersHorizontal className="w-3 h-3" />
                                    </span>
                                    <span className="font-heading font-bold text-[13px] tracking-tight text-slate-900 group-hover:text-amber-900 leading-tight">
                                      HVAC Distribution
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition shrink-0" />
                                </Link>

                                <ul className="space-y-0.5 text-[13.5px] text-slate-600 font-medium mb-2">
                                  <li>
                                    <Link
                                      href="/hepa-terminal-box/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      HEPA Terminal Box
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/supply-return-air-grille/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Supply / Return Grilles
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/supply-return-air-diffuser/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Air Diffusers
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/return-air-riser/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Return Air Riser
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/volume-control-damper-v-c-d/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="block py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition leading-tight"
                                    >
                                      Volume Control Damper
                                    </Link>
                                  </li>
                                </ul>

                                <Link
                                  href="/hvac-products/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="inline-flex items-center gap-1 text-[12.5px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2 py-0.5 rounded-full mb-2.5 transition w-fit"
                                >
                                  <span>View Distribution</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>

                              <div className="mt-auto relative h-20 rounded-lg overflow-hidden border border-slate-200/80 bg-slate-100 shadow-2xs group shrink-0">
                                <Image
                                  src="/images/supply-return-air-diffuser.jpg"
                                  alt="HVAC Distribution"
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </div>

                            {/* Col 5: Cleanroom Solutions */}
                            <div className="flex flex-col justify-between h-full bg-slate-50/40 p-2 rounded-xl border border-slate-100">
                              <div className="flex flex-col">
                                <Link
                                  href="/cleanroom-turnkey-solution/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="flex items-center justify-between p-1.5 rounded-lg bg-cyan-50/80 border border-cyan-100 hover:bg-cyan-100/80 transition group mb-2"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="w-5 h-5 rounded-md bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                      <Layers className="w-3 h-3" />
                                    </span>
                                    <span className="font-heading font-bold text-[13px] tracking-tight text-slate-900 group-hover:text-cyan-900 leading-tight">
                                      Cleanroom Solutions
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition shrink-0" />
                                </Link>

                                <ul className="space-y-0.5 text-[13.5px] text-slate-700 font-medium mb-2">
                                  <li>
                                    <Link
                                      href="/modular-cleanroom-solution/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="flex items-center gap-1.5 py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition group leading-tight"
                                    >
                                      <span className="w-3.5 h-3.5 rounded bg-cyan-100/80 text-cyan-700 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition">
                                        <Building2 className="w-2.5 h-2.5" />
                                      </span>
                                      <span>Modular Cleanroom</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/modular-ot/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="flex items-center gap-1.5 py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition group leading-tight"
                                    >
                                      <span className="w-3.5 h-3.5 rounded bg-cyan-100/80 text-cyan-700 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition">
                                        <Cross className="w-2.5 h-2.5" />
                                      </span>
                                      <span>Modular OT</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/modular-clean-room-doors/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="flex items-center gap-1.5 py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition group leading-tight"
                                    >
                                      <span className="w-3.5 h-3.5 rounded bg-cyan-100/80 text-cyan-700 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition">
                                        <DoorClosed className="w-2.5 h-2.5" />
                                      </span>
                                      <span>Clean Room Doors</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/cleanroom-turnkey-solution/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="flex items-center gap-1.5 py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition group leading-tight"
                                    >
                                      <span className="w-3.5 h-3.5 rounded bg-cyan-100/80 text-cyan-700 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition">
                                        <Shield className="w-2.5 h-2.5" />
                                      </span>
                                      <span>Turnkey Solutions</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/other-products-laboratory-equipment/"
                                      onClick={() => setMegaMenuOpen(false)}
                                      className="flex items-center gap-1.5 py-0.5 hover:text-brand-900 hover:translate-x-0.5 transition group leading-tight"
                                    >
                                      <span className="w-3.5 h-3.5 rounded bg-cyan-100/80 text-cyan-700 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition">
                                        <FlaskConical className="w-2.5 h-2.5" />
                                      </span>
                                      <span>Test Chambers</span>
                                    </Link>
                                  </li>
                                </ul>

                                <Link
                                  href="/cleanroom-turnkey-solution/"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="inline-flex items-center gap-1 text-[12.5px] font-bold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200/80 px-2 py-0.5 rounded-full mb-2.5 transition w-fit"
                                >
                                  <span>Explore Solutions</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>

                              <div className="mt-auto relative h-20 rounded-lg overflow-hidden border border-slate-200/80 bg-slate-100 shadow-2xs group shrink-0">
                                <Image
                                  src="/images/Cleanroom-door1.jpg"
                                  alt="Cleanroom Solutions"
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </div>

                          </div>

                          {/* Right Sidebar Area (~250px) */}
                          <div className="w-full lg:w-[250px] shrink-0 flex flex-col justify-between gap-2.5">
                            {/* Top Navy Card */}
                            <div className="relative rounded-xl bg-[#0a2f44] overflow-hidden p-4 text-white flex flex-col justify-between shadow-md border border-slate-700/50">
                              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                                <Image
                                  src="/images/clean-room-equipmrnt.jpg"
                                  alt="Cleanroom Turnkey"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="relative z-10">
                                <span className="inline-block px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-[10.5px] font-semibold tracking-wider uppercase mb-1.5">
                                  CUSTOMIZED SOLUTIONS
                                </span>
                                <h4 className="font-heading font-bold text-[16px] text-white leading-snug mb-1.5">
                                  Cleanroom Turnkey Projects
                                </h4>
                                <p className="text-[13px] text-slate-300 leading-relaxed">
                                  Complete end-to-end design, manufacturing, supply & validation for ISO Class 5-8 cleanrooms.
                                </p>
                              </div>

                              <div className="relative z-10 pt-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setMegaMenuOpen(false);
                                    setEnquiryModalOpen(true);
                                  }}
                                  className="w-full flex items-center justify-between bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 text-[14px] font-bold py-2 px-3 rounded-lg shadow-sm transition"
                                >
                                  <span>Request a Quote</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Bottom 3 Services Features */}
                            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 space-y-2 shadow-2xs">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                  <Headphones className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-[13.5px] text-slate-900 leading-tight">Expert Support</p>
                                  <p className="text-[12px] text-slate-500 leading-tight">Consulting & engineering assistance</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                  <Clock className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-[13.5px] text-slate-900 leading-tight">Fast Turnaround</p>
                                  <p className="text-[12px] text-slate-500 leading-tight">Timely manufacturing & delivery</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                                  <MapPin className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-[13.5px] text-slate-900 leading-tight">Pan India Service</p>
                                  <p className="text-[12px] text-slate-500 leading-tight">On-site installation & validation</p>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Bottom Full-Width Utility Bar */}
                      <div className="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-5 py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs shrink-0">
                        {/* Left Utility Actions */}
                        <div className="flex items-center gap-3 sm:gap-4 text-slate-600 font-semibold text-[13px]">
                          <button
                            type="button"
                            onClick={() => {
                              setMegaMenuOpen(false);
                              setEnquiryModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 hover:text-brand-900 transition"
                          >
                            <FileText className="w-4 h-4 text-brand-600" />
                            <span>Download Brochure</span>
                          </button>
                          <span className="text-slate-300">|</span>
                          <Link
                            href="/about-us-peter-air-systems/"
                            onClick={() => setMegaMenuOpen(false)}
                            className="flex items-center gap-1.5 hover:text-brand-900 transition"
                          >
                            <Award className="w-4 h-4 text-brand-600" />
                            <span>Certifications (ISO & CE)</span>
                          </Link>
                          <span className="text-slate-300">|</span>
                          <button
                            type="button"
                            onClick={() => {
                              setMegaMenuOpen(false);
                              setEnquiryModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 hover:text-brand-900 transition"
                          >
                            <Sparkles className="w-4 h-4 text-brand-600" />
                            <span>Request Custom Solution</span>
                          </button>
                        </div>

                        {/* Right Catalog Button */}
                        <Link
                          href="/search/"
                          onClick={() => setMegaMenuOpen(false)}
                          className="inline-flex items-center gap-1.5 bg-[#073650] hover:bg-[#0a4566] text-white text-[13px] font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition shrink-0"
                        >
                          <span>View Complete Product Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/services/" className="hover:text-brand-900 transition py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D93636] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
              Solutions & Services
            </Link>

            <Link href="/industries/" className="hover:text-brand-900 transition py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D93636] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
              Industries
            </Link>

            <Link href="/blog/" className="hover:text-brand-900 transition py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D93636] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
              Insights & Blog
            </Link>

            <Link href="/contact-peter-air-systems/" className="hover:text-brand-900 transition py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D93636] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/search/"
              aria-label="Search products"
              className="p-2 text-slate-500 hover:text-brand-800 hover:bg-slate-100 rounded-lg transition"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setEnquiryModalOpen(true)}
              type="button"
              className="bg-[#063B5C] hover:bg-[#084b75] text-white font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/search/"
              aria-label="Search products"
              className="p-2 text-slate-600 hover:text-brand-800"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle mobile menu"
              className="p-2 text-slate-700 hover:text-brand-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-50 bg-white lg:hidden overflow-y-auto border-t border-slate-200 pb-20 animate-fade-in">
          <div className="px-5 py-6 space-y-4">
            {/* Mobile Drawer Brand Identity */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 group"
              >
                <Image
                  src="/images/PETER-AIR-LOGO.png"
                  alt="Peter Air Systems Logo"
                  width={70}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
                <div className="flex flex-col justify-center">
                  <span className="font-heading font-black text-xl tracking-tight text-brand-950 leading-none">
                    PETER AIR
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.22em] text-brand-700 uppercase leading-tight mt-0.5">
                    SYSTEMS
                  </span>
                </div>
              </Link>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-brand-50 text-brand-800 rounded border border-brand-200/60">
                ISO 9001:2015
              </span>
            </div>

            <div className="flex flex-col space-y-3 pb-4 border-b border-slate-200 text-base font-medium text-slate-800">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-800 transition"
              >
                Home
              </Link>
              <Link
                href="/about-us-peter-air-systems/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-800 transition"
              >
                About Peter Air Systems
              </Link>

              {/* Mobile Products Accordion */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="w-full flex items-center justify-between p-3.5 text-left font-semibold text-slate-900 hover:text-brand-800 focus:outline-none bg-white"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-700" />
                    <span>Products & Equipment</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileProductsOpen && (
                  <div className="p-3 space-y-2.5 text-sm text-slate-600 bg-white border-t border-slate-100">
                    {/* Sub-group 1: Air Handling */}
                    <div className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/60">
                      <div className="flex items-center gap-2 font-bold text-brand-900 text-xs uppercase mb-1.5">
                        <Wind className="w-3.5 h-3.5 text-brand-700" />
                        <span>Air Handling & HVAC</span>
                      </div>
                      <div className="space-y-1 pl-5 text-xs">
                        <Link href="/air-handling-unit-ahu/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Air Handling Unit (AHU)</Link>
                        <Link href="/air-washer-unit/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Air Washer Unit</Link>
                        <Link href="/dehumidifier-unit/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Dehumidifier Unit</Link>
                      </div>
                    </div>

                    {/* Sub-group 2: Cleanroom Equipment */}
                    <div className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/60">
                      <div className="flex items-center gap-2 font-bold text-brand-900 text-xs uppercase mb-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
                        <span>Cleanroom Equipment</span>
                      </div>
                      <div className="space-y-1 pl-5 text-xs">
                        <Link href="/air-shower/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Air Shower</Link>
                        <Link href="/static-pass-box/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Static Pass Box</Link>
                        <Link href="/dynamic-pass-box/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Dynamic Pass Box</Link>
                        <Link href="/bio-safety-cabinets/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Bio Safety Cabinets</Link>
                        <Link href="/laminar-work-stations/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Laminar Work Stations</Link>
                        <Link href="/dispensing-booth/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Dispensing Booth</Link>
                        <Link href="/garment-cabinet/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Garment Cabinet</Link>
                        <Link href="/reverse-laminar-flow-unit/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Reverse Laminar Flow Unit</Link>
                        <Link href="/other-products-laboratory-equipment/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Other Products / Laboratory Equipment</Link>
                      </div>
                    </div>

                    {/* Sub-group 3: Air Filters */}
                    <div className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/60">
                      <div className="flex items-center gap-2 font-bold text-brand-900 text-xs uppercase mb-1.5">
                        <Filter className="w-3.5 h-3.5 text-brand-700" />
                        <span>Air Filters</span>
                      </div>
                      <div className="space-y-1 pl-5 text-xs">
                        <Link href="/enhance-air-quality-with-pre-filters/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Pre Filters (G3/G4)</Link>
                        <Link href="/fine-filter/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Fine Filter (Microvee F7/F9)</Link>
                        <Link href="/hepa-filter/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">HEPA Filter (H13/H14)</Link>
                        <Link href="/mini-pleat-hepa-filter/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Mini Pleat HEPA Filter</Link>
                        <Link href="/air-filters/" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-brand-700 font-semibold">All Filtration Systems →</Link>
                      </div>
                    </div>

                    {/* Sub-group 4: HVAC Distribution */}
                    <div className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/60">
                      <div className="flex items-center gap-2 font-bold text-brand-900 text-xs uppercase mb-1.5">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-brand-700" />
                        <span>HVAC Distribution</span>
                      </div>
                      <div className="space-y-1 pl-5 text-xs">
                        <Link href="/hepa-terminal-box/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">HEPA Terminal Box</Link>
                        <Link href="/supply-return-air-grille/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Supply / Return Grilles</Link>
                        <Link href="/supply-return-air-diffuser/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Air Diffusers</Link>
                        <Link href="/return-air-riser/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Return Air Riser</Link>
                        <Link href="/volume-control-damper-v-c-d/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Volume Control Damper (VCD)</Link>
                      </div>
                    </div>

                    {/* Sub-group 5: Cleanroom Solutions */}
                    <div className="border border-brand-200/60 rounded-lg p-2.5 bg-brand-50/50">
                      <div className="flex items-center gap-2 font-bold text-brand-900 text-xs uppercase mb-1.5">
                        <Layers className="w-3.5 h-3.5 text-brand-700" />
                        <span>Cleanroom Solutions</span>
                      </div>
                      <div className="space-y-1 pl-5 text-xs">
                        <Link href="/modular-cleanroom-solution/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Modular Cleanroom</Link>
                        <Link href="/modular-ot/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Modular OT (Hospital)</Link>
                        <Link href="/modular-clean-room-doors/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Modular Clean Room Doors</Link>
                        <Link href="/cleanroom-turnkey-solution/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Cleanroom Turnkey Solution</Link>
                        <Link href="/other-products-laboratory-equipment/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand-800">Laboratory Test Chambers</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/services/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-800 transition"
              >
                Solutions & Services
              </Link>
              <Link
                href="/industries/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-800 transition"
              >
                Industries We Serve
              </Link>
              <Link
                href="/blog/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-800 transition"
              >
                Knowledge & Blog
              </Link>
              <Link
                href="/contact-peter-air-systems/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-800 transition"
              >
                Contact Information
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full bg-[#063B5C] hover:bg-[#084b75] text-white font-semibold py-3 rounded-lg text-center shadow"
              >
                Request Quotation / Get a Quote
              </button>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-lg text-center shadow"
              >
                <span>WhatsApp Technical Sales</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-800 font-semibold py-3 rounded-lg text-center hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-brand-700" />
                <span>Call {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        sourceContext="Header CTA"
      />
    </>
  );
};

