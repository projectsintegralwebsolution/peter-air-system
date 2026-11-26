"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import {
  Home,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  BarChart3,
  Globe,
  Building2,
  Wind,
  Box,
  Cross,
  Filter,
  Wrench,
  Eye,
  Flag,
  Gem,
  Pill,
  Microscope,
  Factory,
  Cpu,
  Search,
  Sliders,
  HeartHandshake,
  Award,
  Lightbulb,
  Anchor,
  Activity,
  Check,
  Fan,
  DoorClosed,
  Plus
} from "lucide-react";

/**
 * Animated number counter triggered via Intersection Observer
 */
const AnimatedStatNumber: React.FC<{
  target: number;
  suffix?: string;
  isVisible: boolean;
}> = ({ target, suffix = "", isVisible }) => {
  const [displayValue, setDisplayValue] = React.useState<number>(target);
  const animatedRef = React.useRef(false);

  React.useEffect(() => {
    if (isVisible && !animatedRef.current) {
      animatedRef.current = true;
      setDisplayValue(0);
      const duration = 1400;
      const steps = 50;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        // Cubic ease-out curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(target * easeOut);
        setDisplayValue(currentVal);

        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayValue(target);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isVisible, target]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

export const AboutUsPage: React.FC = () => {
  const statsRef = React.useRef<HTMLDivElement>(null);
  const [isStatsVisible, setIsStatsVisible] = React.useState(false);

  React.useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page w-full bg-white text-[#475569] antialiased selection:bg-[#1D82B2] selection:text-white">
      <style jsx global>{`
        .about-page ::selection,
        .about-page::selection {
          background-color: #1D82B2 !important;
          color: #FFFFFF !important;
        }
        .about-page ::-moz-selection,
        .about-page::-moz-selection {
          background-color: #1D82B2 !important;
          color: #FFFFFF !important;
        }
        .about-page h1:not(.text-white):not([class*="text-white"]),
        .about-page h2:not(.text-white):not([class*="text-white"]),
        .about-page h3:not(.text-white):not([class*="text-white"]),
        .about-page h4:not(.text-white):not([class*="text-white"]) {
          color: #0F172A !important;
        }
        .about-page .group:hover h3.group-hover\:text-\[\#1D82B2\],
        .about-page .group:hover h3[class*="group-hover:!text-[#1D82B2]"],
        .about-page .group:hover [class*="group-hover:!text-[#1D82B2]"] {
          color: #1D82B2 !important;
        }
      `}</style>

      {/* =========================================================================
          SECTION 1 – ABOUT US HERO BANNER
          Exact match to Solutions & Services page banner design
      ========================================================================= */}
      <PageBanner
        title="About Peter Air Systems"
        subtitle="Engineering Controlled Environments. Delivering Quality. Building Trust."
        badge="PETER AIR SYSTEMS • ENGINEERING SOLUTIONS"
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* =========================================================================
          SECTION 2 – COMPANY INTRODUCTION
          Two-column section with industrial photo & structured key facts
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Industrial Facility / Team Photograph */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#DCE7F0] bg-slate-100">
                <Image
                  src="/images/about-who-we-are-engineers.jpg"
                  alt="Peter Air Systems engineers working on HVAC equipment and air handling systems" title="Peter Air Systems engineers working on HVAC equipment and air handling systems"
                  fill
                  priority
                  className="object-cover object-center scale-[1.02] hover:scale-[1.04] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              {/* Subtle Decorative Blue Accent Card */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 bg-white border border-[#DCE7F0] shadow-md rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xs font-bold !text-[#0F172A]">Engineering Excellence</div>
                  <div className="text-[11px] text-slate-500">Precision Turnkey Execution</div>
                </div>
              </div>
            </div>

            {/* Right Column: Approved Text & Key Facts */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1D82B2] uppercase tracking-widest bg-[#F3F8FC] border border-[#DCE7F0] px-3 py-1 rounded">
                  <span className="w-1.5 h-1.5 bg-[#1D82B2] rounded-full" />
                  <span>WHO WE ARE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-[#0F172A] tracking-tight leading-tight">
                  Engineering Excellence. Precision in Every Project.
                </h2>
              </div>

              {/* Approved Paragraphs */}
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Established in 2018, Peter Air Systems is an engineering-driven company specializing in HVAC systems, cleanroom infrastructure, modular operation theatres and air filtration solutions.
                </p>
                <p>
                  Founded by a Mechanical and Electrical Engineering professional, the company combines technical expertise, engineering knowledge and practical project experience to deliver dependable solutions for modern industrial and healthcare environments.
                </p>
                <p>
                  With <strong className="text-[#1D82B2] font-semibold">100+ successfully completed projects</strong>, Peter Air Systems has established its capabilities in engineering, manufacturing, supply, installation and turnkey project execution.
                </p>
                <p>
                  We focus on transforming complex engineering requirements into practical, efficient and reliable solutions, while building long-term customer relationships through professional execution and technical excellence.
                </p>
              </div>

              {/* Visual Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F3F8FC] border border-[#DCE7F0]">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Established</div>
                  <div className="text-base sm:text-lg font-bold text-[#102A43] mt-0.5">2018</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F3F8FC] border border-[#DCE7F0]">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Experience</div>
                  <div className="text-base sm:text-lg font-bold text-[#1D82B2] mt-0.5">100+ Projects</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F3F8FC] border border-[#DCE7F0]">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Project Reach</div>
                  <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-0.5 leading-snug">Global Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 – COMPANY STATISTICS
          Horizontal 4-stat presentation with smooth count-up animation
      ========================================================================= */}
      <section className="py-12 bg-[#F3F8FC] border-y border-[#DCE7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={statsRef}
            className="bg-white border border-[#DCE7F0] rounded-2xl p-6 sm:p-8 shadow-xs"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#DCE7F0]">
              {/* Stat 1: 100+ Projects Completed */}
              <div className="flex items-center gap-3.5 sm:gap-4 justify-start lg:justify-center px-2 sm:px-4 py-2">
                <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] flex items-center justify-center shrink-0 text-[#1D82B2] shadow-xs">
                  <BarChart3 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight leading-none mb-1">
                    <AnimatedStatNumber target={100} suffix="+" isVisible={isStatsVisible} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 leading-tight">
                    Projects Completed
                  </div>
                </div>
              </div>

              {/* Stat 2: 2018 Established */}
              <div className="flex items-center gap-3.5 sm:gap-4 justify-start lg:justify-center px-2 sm:px-4 py-2">
                <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] flex items-center justify-center shrink-0 text-[#1D82B2] shadow-xs">
                  <Calendar className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight leading-none mb-1">
                    <AnimatedStatNumber target={2018} isVisible={isStatsVisible} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 leading-tight">
                    Established
                  </div>
                </div>
              </div>

              {/* Stat 3: 5+ Core Solution Areas */}
              <div className="flex items-center gap-3.5 sm:gap-4 justify-start lg:justify-center px-2 sm:px-4 py-2">
                <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] flex items-center justify-center shrink-0 text-[#1D82B2] shadow-xs">
                  <Layers className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight leading-none mb-1">
                    <AnimatedStatNumber target={5} suffix="+" isVisible={isStatsVisible} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 leading-tight">
                    Core Solution Areas
                  </div>
                </div>
              </div>

              {/* Stat 4: Global Project Experience */}
              <div className="flex items-center gap-3.5 sm:gap-4 justify-start lg:justify-center px-2 sm:px-4 py-2">
                <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] flex items-center justify-center shrink-0 text-[#1D82B2] shadow-xs">
                  <Globe className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight leading-none mb-1">
                    Global
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 leading-tight">
                    Project Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 – OUR EXPERTISE & TURNKEY CAPABILITIES
          3-column desktop, 2-column tablet, 1-column mobile grid
      ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F2F8FC] border-y border-[#DCE7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-4xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1D82B2] uppercase tracking-widest bg-white border border-[#DCE7F0] px-3.5 py-1.5 rounded-md mb-3 shadow-2xs">
              <span className="w-2 h-2 bg-[#1D82B2] rounded-full" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold !text-[#0F172A] tracking-tight leading-tight">
              Integrated Engineering Solutions from Concept to Completion
            </h2>
            <div className="w-14 h-1.5 bg-[#1D82B2] rounded-full mt-3.5 mb-5" />
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              We provide comprehensive engineering capabilities across HVAC and controlled-environment applications. Our integrated approach covers technical planning, engineering, manufacturing, installation and project execution.
            </p>
          </div>

          {/* 6 Capability Cards: 3 per row on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* 1. Cleanroom Infrastructure */}
            <div className="group bg-white border border-[#DCE7F0] rounded-2xl p-8 sm:p-9 shadow-xs hover:border-[#1D82B2]/60 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(29,130,178,0.18)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
              {/* Subtle Blue Top-Border Accent on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#1D82B2] transition-colors duration-300" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center shrink-0 mb-6 shadow-xs group-hover:bg-[#1D82B2] group-hover:text-white transition-all duration-300">
                  <Building2 className="w-7 h-7 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-[1.35rem] font-bold !text-[#0F172A] tracking-tight mb-3 group-hover:!text-[#1D82B2] transition-colors leading-snug">
                  Cleanroom Infrastructure
                </h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  Design, manufacturing and installation of modular cleanroom panels, doors, ceiling systems and associated infrastructure for controlled environments.
                </p>
              </div>
            </div>

            {/* 2. HVAC Systems */}
            <div className="group bg-white border border-[#DCE7F0] rounded-2xl p-8 sm:p-9 shadow-xs hover:border-[#1D82B2]/60 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(29,130,178,0.18)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
              {/* Subtle Blue Top-Border Accent on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#1D82B2] transition-colors duration-300" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center shrink-0 mb-6 shadow-xs group-hover:bg-[#1D82B2] group-hover:text-white transition-all duration-300">
                  <Wind className="w-7 h-7 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-[1.35rem] font-bold !text-[#0F172A] tracking-tight mb-3 group-hover:!text-[#1D82B2] transition-colors leading-snug">
                  HVAC Systems
                </h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  Integrated heating, ventilation, air conditioning and environmental control solutions tailored to industrial and healthcare requirements.
                </p>
              </div>
            </div>

            {/* 3. Air Handling Units (AHUs) */}
            <div className="group bg-white border border-[#DCE7F0] rounded-2xl p-8 sm:p-9 shadow-xs hover:border-[#1D82B2]/60 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(29,130,178,0.18)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
              {/* Subtle Blue Top-Border Accent on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#1D82B2] transition-colors duration-300" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center shrink-0 mb-6 shadow-xs group-hover:bg-[#1D82B2] group-hover:text-white transition-all duration-300">
                  <Box className="w-7 h-7 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-[1.35rem] font-bold !text-[#0F172A] tracking-tight mb-3 group-hover:!text-[#1D82B2] transition-colors leading-snug">
                  Air Handling Units (AHUs)
                </h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  Engineered air handling solutions for effective air circulation, filtration, temperature regulation and humidity management.
                </p>
              </div>
            </div>

            {/* 4. Modular Operation Theatres */}
            <div className="group bg-white border border-[#DCE7F0] rounded-2xl p-8 sm:p-9 shadow-xs hover:border-[#1D82B2]/60 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(29,130,178,0.18)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
              {/* Subtle Blue Top-Border Accent on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#1D82B2] transition-colors duration-300" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center shrink-0 mb-6 shadow-xs group-hover:bg-[#1D82B2] group-hover:text-white transition-all duration-300">
                  <Activity className="w-7 h-7 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-[1.35rem] font-bold !text-[#0F172A] tracking-tight mb-3 group-hover:!text-[#1D82B2] transition-colors leading-snug">
                  Modular Operation Theatres
                </h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  Complete modular OT infrastructure solutions designed around hygiene, controlled airflow, operational functionality and modern healthcare requirements.
                </p>
              </div>
            </div>

            {/* 5. Air Filtration Systems */}
            <div className="group bg-white border border-[#DCE7F0] rounded-2xl p-8 sm:p-9 shadow-xs hover:border-[#1D82B2]/60 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(29,130,178,0.18)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
              {/* Subtle Blue Top-Border Accent on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#1D82B2] transition-colors duration-300" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center shrink-0 mb-6 shadow-xs group-hover:bg-[#1D82B2] group-hover:text-white transition-all duration-300">
                  <Filter className="w-7 h-7 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-[1.35rem] font-bold !text-[#0F172A] tracking-tight mb-3 group-hover:!text-[#1D82B2] transition-colors leading-snug">
                  Air Filtration Systems
                </h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  Specialized filtration solutions supporting clean air requirements across HVAC systems and controlled environments.
                </p>
              </div>
            </div>

            {/* 6. Project Engineering & Execution */}
            <div className="group bg-white border border-[#DCE7F0] rounded-2xl p-8 sm:p-9 shadow-xs hover:border-[#1D82B2]/60 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(29,130,178,0.18)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
              {/* Subtle Blue Top-Border Accent on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#1D82B2] transition-colors duration-300" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center shrink-0 mb-6 shadow-xs group-hover:bg-[#1D82B2] group-hover:text-white transition-all duration-300">
                  <Wrench className="w-7 h-7 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-[1.35rem] font-bold !text-[#0F172A] tracking-tight mb-3 group-hover:!text-[#1D82B2] transition-colors leading-snug">
                  Project Engineering &amp; Execution
                </h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  Technical planning, coordinated installation, system integration and turnkey project execution to meet specific project requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 – OUR PRODUCTS & SOLUTIONS
          6 manufactured products with overlapping icon badges and no product links
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#F8FBFE] border-b border-[#DCE7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1D82B2] uppercase tracking-wider bg-[#EAF5FA] border border-[#DCE7F0] px-3.5 py-1 rounded-full mb-3 shadow-2xs">
              <span className="w-2 h-2 bg-[#1D82B2] rounded-full" />
              <span>PRODUCT PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold !text-[#0F172A] tracking-tight leading-tight">
              Precision-Engineered Products
              <br className="hidden sm:inline" /> for Controlled Environments
            </h2>
            <div className="w-12 h-1 bg-[#1D82B2] rounded-full mt-3.5 mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our product portfolio supports diverse HVAC, cleanroom and healthcare applications, with a focus on functionality, durability and reliable performance.
            </p>
          </div>

          {/* 6 Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Product 1: Air Handling Units (AHUs) */}
            <div className="bg-white border border-[#DCE7F0] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#1D82B2]/50 transition-all duration-300 flex flex-col h-full">
              <div className="relative w-full aspect-[16/10] bg-[#F7F7F7] flex items-center justify-center p-3">
                <Image
                  src="/images/Air-handling-unit-.jpg"
                  alt="Air Handling Units (AHUs) by Peter Air Systems" title="Air Handling Units (AHUs) by Peter Air Systems"
                  fill
                  className="object-contain object-center hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlapping Floating Icon Badge */}
                <div className="absolute -bottom-5 left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#DCE7F0] shadow-md flex items-center justify-center text-[#1D82B2] z-10">
                  <Fan className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>
              </div>
              <div className="pt-8 pb-7 px-6 sm:px-7 flex-1 flex flex-col justify-start">
                <h3 className="text-lg sm:text-xl font-bold !text-[#0F172A] mb-2 leading-snug">
                  Air Handling Units (AHUs)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  High-performance air handling equipment designed for air circulation, filtration, temperature control and humidity management.
                </p>
              </div>
            </div>

            {/* Product 2: Modular Cleanroom Doors */}
            <div className="bg-white border border-[#DCE7F0] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#1D82B2]/50 transition-all duration-300 flex flex-col h-full">
              <div className="relative w-full aspect-[16/10] bg-[#F7F7F7]">
                <Image
                  src="/images/Cleanroom-door1.jpg"
                  alt="Modular Cleanroom Doors by Peter Air Systems" title="Modular Cleanroom Doors by Peter Air Systems"
                  fill
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlapping Floating Icon Badge */}
                <div className="absolute -bottom-5 left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#DCE7F0] shadow-md flex items-center justify-center text-[#1D82B2] z-10">
                  <DoorClosed className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>
              </div>
              <div className="pt-8 pb-7 px-6 sm:px-7 flex-1 flex flex-col justify-start">
                <h3 className="text-lg sm:text-xl font-bold !text-[#0F172A] mb-2 leading-snug">
                  Modular Cleanroom Doors
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Specialized doors engineered for controlled environments, offering hygienic construction, durability and smooth operation.
                </p>
              </div>
            </div>

            {/* Product 3: Cleanroom Panels */}
            <div className="bg-white border border-[#DCE7F0] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#1D82B2]/50 transition-all duration-300 flex flex-col h-full">
              <div className="relative w-full aspect-[16/10] bg-[#F7F7F7]">
                <Image
                  src="/images/MODULAR-CLEAN-ROOM-PANELS.jpg"
                  alt="Cleanroom Wall and Ceiling Panels by Peter Air Systems" title="Cleanroom Wall and Ceiling Panels by Peter Air Systems"
                  fill
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlapping Floating Icon Badge */}
                <div className="absolute -bottom-5 left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#DCE7F0] shadow-md flex items-center justify-center text-[#1D82B2] z-10">
                  <Layers className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>
              </div>
              <div className="pt-8 pb-7 px-6 sm:px-7 flex-1 flex flex-col justify-start">
                <h3 className="text-lg sm:text-xl font-bold !text-[#0F172A] mb-2 leading-snug">
                  Cleanroom Panels
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Modular wall and ceiling panel systems designed to create hygienic, durable and controlled spaces.
                </p>
              </div>
            </div>

            {/* Product 4: Modular Operation Theatres (OT) */}
            <div className="bg-white border border-[#DCE7F0] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#1D82B2]/50 transition-all duration-300 flex flex-col h-full">
              <div className="relative w-full aspect-[16/10] bg-[#F7F7F7]">
                <Image
                  src="/images/modular-ot-new.jpg"
                  alt="Modular Operation Theatre Solutions by Peter Air Systems" title="Modular Operation Theatre Solutions by Peter Air Systems"
                  fill
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlapping Floating Icon Badge */}
                <div className="absolute -bottom-5 left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#DCE7F0] shadow-md flex items-center justify-center text-[#1D82B2] z-10">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </div>
              </div>
              <div className="pt-8 pb-7 px-6 sm:px-7 flex-1 flex flex-col justify-start">
                <h3 className="text-lg sm:text-xl font-bold !text-[#0F172A] mb-2 leading-snug">
                  Modular Operation Theatres (OT)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Integrated modular OT solutions featuring specialized infrastructure for modern healthcare facilities.
                </p>
              </div>
            </div>

            {/* Product 5: HVAC Systems */}
            <div className="bg-white border border-[#DCE7F0] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#1D82B2]/50 transition-all duration-300 flex flex-col h-full">
              <div className="relative w-full aspect-[16/10] bg-[#F7F7F7]">
                <Image
                  src="/images/hvac-systems-ducting.jpg"
                  alt="Industrial HVAC Systems and Ducting by Peter Air Systems" title="Industrial HVAC Systems and Ducting by Peter Air Systems"
                  fill
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlapping Floating Icon Badge */}
                <div className="absolute -bottom-5 left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#DCE7F0] shadow-md flex items-center justify-center text-[#1D82B2] z-10">
                  <Wind className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>
              </div>
              <div className="pt-8 pb-7 px-6 sm:px-7 flex-1 flex flex-col justify-start">
                <h3 className="text-lg sm:text-xl font-bold !text-[#0F172A] mb-2 leading-snug">
                  HVAC Systems
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Heating, ventilation and air conditioning solutions designed to meet environmental control and ventilation requirements.
                </p>
              </div>
            </div>

            {/* Product 6: Air Filters & Filtration Systems */}
            <div className="bg-white border border-[#DCE7F0] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#1D82B2]/50 transition-all duration-300 flex flex-col h-full">
              <div className="relative w-full aspect-[16/10] bg-[#F7F7F7] flex items-center justify-center p-3">
                <Image
                  src="/images/Hepa-Filter.jpg"
                  alt="Air Filters and Filtration Systems by Peter Air Systems" title="Air Filters and Filtration Systems by Peter Air Systems"
                  fill
                  className="object-contain object-center hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlapping Floating Icon Badge */}
                <div className="absolute -bottom-5 left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#DCE7F0] shadow-md flex items-center justify-center text-[#1D82B2] z-10">
                  <Filter className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>
              </div>
              <div className="pt-8 pb-7 px-6 sm:px-7 flex-1 flex flex-col justify-start">
                <h3 className="text-lg sm:text-xl font-bold !text-[#0F172A] mb-2 leading-snug">
                  Air Filters &amp; Filtration Systems
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Filtration products and systems developed to support clean air standards and efficient HVAC operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 – OUR PROJECT EXPERIENCE
          Deep navy engineering section with 100+ global project focus
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#102A43] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-200 uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded">
                  <span className="w-1.5 h-1.5 bg-[#1D82B2] rounded-full" />
                  <span>OUR EXPERIENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  100+ Projects Completed Across Global Markets
                </h2>
              </div>

              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Our project experience reflects our engineering capabilities, technical understanding and ability to manage diverse project requirements.
                </p>
                <p>
                  Across 100+ successfully completed projects, we have developed experience in handling different technical specifications, operational environments and execution challenges.
                </p>
              </div>

              {/* 5 Capability Points */}
              <ul className="space-y-3 pt-2">
                {[
                  "Understanding project-specific technical and operational requirements.",
                  "Developing practical and customized engineering solutions.",
                  "Maintaining workmanship standards and attention to detail.",
                  "Coordinating installation and execution efficiently.",
                  "Providing dependable solutions and long-term customer support."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#1D82B2] shrink-0 mt-0.5 stroke-[2.2]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight Statement */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm mt-4">
                <p className="text-xs sm:text-sm font-semibold text-cyan-100 italic">
                  &ldquo;Every project represents our commitment to engineering precision, dependable execution and customer trust.&rdquo;
                </p>
              </div>
            </div>

            {/* Right Side: Installation Photography & Large 100+ Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/15 bg-slate-900">
                <Image
                  src="/images/about-project-technician.jpg"
                  alt="Peter Air Systems engineer inspecting an HVAC control panel at an industrial facility." title="Peter Air Systems engineer inspecting an HVAC control panel at an industrial facility."
                  fill
                  priority
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>

              {/* Large Statistic Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-7 sm:-left-6 bg-gradient-to-r from-[#1D82B2] to-[#156d97] text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-white/20">
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">100+</div>
                <div className="text-xs font-semibold text-cyan-100 uppercase tracking-wider mt-0.5">Projects Completed</div>
                <div className="text-[11px] text-white/80">Across Global Markets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 – INDUSTRIES WE SERVE
          7 industry categories with clean iconography
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-[#0F172A] tracking-tight leading-tight">
              Supporting Industries Where Environmental Control Matters
            </h2>
            <div className="w-12 h-1 bg-[#1D82B2] rounded-full mt-3 mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We provide HVAC and cleanroom solutions for industries and facilities where air quality, hygiene, filtration and environmental control are essential.
            </p>
          </div>

          {/* 7 Industry Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Pharmaceutical & Healthcare */}
            <div className="p-5 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Pill className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold !text-[#0F172A]">Pharmaceutical &amp; Healthcare</h3>
            </div>

            {/* 2. Hospitals & Medical Facilities */}
            <div className="p-5 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Cross className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold !text-[#0F172A]">Hospitals &amp; Medical Facilities</h3>
            </div>

            {/* 3. Modular Operation Theatres */}
            <div className="p-5 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Activity className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold !text-[#0F172A]">Modular Operation Theatres</h3>
            </div>

            {/* 4. Laboratories & Research Facilities */}
            <div className="p-5 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Microscope className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold !text-[#0F172A]">Laboratories &amp; Research Facilities</h3>
            </div>

            {/* 5. Industrial Manufacturing */}
            <div className="p-5 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Factory className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold !text-[#0F172A]">Industrial Manufacturing</h3>
            </div>

            {/* 6. Cleanroom & Controlled Environments */}
            <div className="p-5 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Layers className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold !text-[#0F172A]">Cleanroom &amp; Controlled Environments</h3>
            </div>

            {/* 7. Specialized HVAC Applications */}
            <div className="p-5 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center col-span-2 sm:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Wind className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold !text-[#0F172A]">Specialized HVAC Applications</h3>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 – OUR APPROACH
          4-step connected horizontal process (Understand -> Engineer -> Execute -> Deliver)
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#F3F8FC] border-y border-[#DCE7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-[#0F172A] tracking-tight leading-tight">
              Understand. Engineer. Execute. Deliver.
            </h2>
            <div className="w-12 h-1 bg-[#1D82B2] rounded-full mt-3 mb-4" />
            <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Every project begins with understanding its specific technical requirements, operational objectives and environmental conditions.
              </p>
              <p>
                Our approach combines engineering planning, practical solution development and coordinated project execution to deliver reliable outcomes. From initial discussions to installation and completion, we emphasize technical accuracy, professional coordination, execution efficiency and customer satisfaction.
              </p>
            </div>
          </div>

          {/* 4-Step Process Grid */}
          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-[#DCE7F0] z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {/* Step 01: Understand */}
              <div className="bg-white border border-[#DCE7F0] rounded-2xl p-6 sm:p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center font-bold text-base shadow-xs">
                    <Search className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-300">01</span>
                </div>
                <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Understand</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Understand project requirements and operational objectives.
                </p>
              </div>

              {/* Step 02: Engineer */}
              <div className="bg-white border border-[#DCE7F0] rounded-2xl p-6 sm:p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center font-bold text-base shadow-xs">
                    <Sliders className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-300">02</span>
                </div>
                <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Engineer</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Develop practical and customized engineering solutions.
                </p>
              </div>

              {/* Step 03: Execute */}
              <div className="bg-white border border-[#DCE7F0] rounded-2xl p-6 sm:p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center font-bold text-base shadow-xs">
                    <Wrench className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-300">03</span>
                </div>
                <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Execute</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Coordinate manufacturing, installation and project execution.
                </p>
              </div>

              {/* Step 04: Deliver */}
              <div className="bg-white border border-[#DCE7F0] rounded-2xl p-6 sm:p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center font-bold text-base shadow-xs">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-300">04</span>
                </div>
                <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Deliver</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Focus on dependable outcomes and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 – VISION & MISSION
          Visually balanced two-column layout with light blue accents & watermarks
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* LEFT CARD – OUR VISION */}
            <div className="group bg-[#F3F8FC] border border-[#DCE7F0] rounded-2xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#1D82B2]/60 hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[360px]">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center shrink-0 shadow-xs">
                    <Eye className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold !text-[#0F172A]">Our Vision</h3>
                    <div className="w-8 h-1 bg-[#1D82B2] rounded-full mt-1.5" />
                  </div>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                  To become a trusted and recognized engineering solutions provider in HVAC, cleanroom infrastructure and controlled environments by continuously advancing our technical capabilities, embracing innovation and delivering dependable solutions across global markets.
                </p>
              </div>

              {/* Decorative Mountain Watermark */}
              <svg
                className="absolute -bottom-1 -right-1 w-32 h-32 text-[#1D82B2]/15 pointer-events-none group-hover:!text-[#1D82B2]/25 transition-colors duration-300"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M10 85 L45 35 L70 70 L80 55 L95 85 Z" />
                <path d="M45 35 L45 15 M45 15 L62 22 L45 29" />
                <path d="M30 60 L40 58 L45 64" />
              </svg>
            </div>

            {/* RIGHT CARD – OUR MISSION */}
            <div className="group bg-[#F3F8FC] border border-[#DCE7F0] rounded-2xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#1D82B2]/60 hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[360px]">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center shrink-0 shadow-xs">
                    <Flag className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold !text-[#0F172A]">Our Mission</h3>
                    <div className="w-8 h-1 bg-[#1D82B2] rounded-full mt-1.5" />
                  </div>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {[
                    "To deliver high-quality HVAC and cleanroom engineering solutions.",
                    "To develop reliable and customized solutions around customer requirements.",
                    "To maintain excellence in engineering, workmanship and project execution.",
                    "To continuously improve our products, technologies and technical capabilities.",
                    "To build lasting partnerships through trust, transparency and commitment."
                  ].map((mission, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#1D82B2] shrink-0 mt-0.5 stroke-[2.2]" />
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative Target Watermark */}
              <svg
                className="absolute -bottom-1 -right-1 w-32 h-32 text-[#1D82B2]/15 pointer-events-none group-hover:!text-[#1D82B2]/25 transition-colors duration-300"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="55" cy="55" r="32" />
                <circle cx="55" cy="55" r="21" />
                <circle cx="55" cy="55" r="10" />
                <circle cx="55" cy="55" r="3" fill="currentColor" />
                <path d="M55 55 L82 28 M82 28 L76 25 M82 28 L85 34 M82 28 L92 18 M92 18 L86 15 M92 18 L95 24" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 – WHY PETER AIR SYSTEMS?
          6 professional benefit cards
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#F3F8FC] border-y border-[#DCE7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1D82B2] uppercase tracking-widest bg-white border border-[#DCE7F0] px-3 py-1 rounded mb-3">
              <span className="w-1.5 h-1.5 bg-[#1D82B2] rounded-full" />
              <span>OUR ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-[#0F172A] tracking-tight leading-tight">
              The Engineering Partner Behind Reliable Solutions
            </h2>
            <div className="w-12 h-1 bg-[#1D82B2] rounded-full mt-3 mb-4" />
          </div>

          {/* 6 Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Engineering Expertise */}
            <div className="bg-white border border-[#DCE7F0] rounded-2xl p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center mb-5 shadow-xs">
                <Cpu className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Engineering Expertise</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Technical understanding of mechanical, electrical, HVAC and controlled-environment applications.
              </p>
            </div>

            {/* 2. Proven Project Experience */}
            <div className="bg-white border border-[#DCE7F0] rounded-2xl p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center mb-5 shadow-xs">
                <Award className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Proven Project Experience</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Demonstrated project execution capabilities backed by 100+ successfully completed projects.
              </p>
            </div>

            {/* 3. Integrated Turnkey Solutions */}
            <div className="bg-white border border-[#DCE7F0] rounded-2xl p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center mb-5 shadow-xs">
                <Layers className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Integrated Turnkey Solutions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprehensive capabilities covering engineering, manufacturing, supply, installation and project execution.
              </p>
            </div>

            {/* 4. Customized Engineering */}
            <div className="bg-white border border-[#DCE7F0] rounded-2xl p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center mb-5 shadow-xs">
                <Sliders className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Customized Engineering</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Practical solutions developed around individual project specifications and operational requirements.
              </p>
            </div>

            {/* 5. Quality & Reliability */}
            <div className="bg-white border border-[#DCE7F0] rounded-2xl p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center mb-5 shadow-xs">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Quality &amp; Reliability</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Focus on dependable products, professional workmanship and disciplined execution.
              </p>
            </div>

            {/* 6. Customer Commitment */}
            <div className="bg-white border border-[#DCE7F0] rounded-2xl p-7 shadow-xs hover:border-[#1D82B2]/60 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#EAF2F8] text-[#1D82B2] flex items-center justify-center mb-5 shadow-xs">
                <HeartHandshake className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold !text-[#0F172A] mb-2">Customer Commitment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dedicated attention to service, project coordination, technical support and long-term relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 – OUR CORE VALUES
          The 6 principles behind Peter Air Systems' engineering
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-[#0F172A] tracking-tight leading-tight">
              The Principles Behind Our Engineering
            </h2>
            <div className="w-12 h-1 bg-[#1D82B2] rounded-full mt-3 mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We believe these principles form the foundation of our engineering practices, project execution and customer relationships.
            </p>
          </div>

          {/* 6 Core Values Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {/* 1. Quality */}
            <div className="p-6 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] text-center hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-sm font-bold !text-[#0F172A]">Quality</h3>
            </div>

            {/* 2. Integrity */}
            <div className="p-6 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] text-center hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <CheckCircle2 className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-sm font-bold !text-[#0F172A]">Integrity</h3>
            </div>

            {/* 3. Innovation */}
            <div className="p-6 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] text-center hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Lightbulb className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-sm font-bold !text-[#0F172A]">Innovation</h3>
            </div>

            {/* 4. Commitment */}
            <div className="p-6 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] text-center hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Flag className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-sm font-bold !text-[#0F172A]">Commitment</h3>
            </div>

            {/* 5. Reliability */}
            <div className="p-6 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] text-center hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <Anchor className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-sm font-bold !text-[#0F172A]">Reliability</h3>
            </div>

            {/* 6. Customer Satisfaction */}
            <div className="p-6 rounded-2xl bg-[#F3F8FC] border border-[#DCE7F0] text-center hover:border-[#1D82B2] hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center mb-3 shadow-xs">
                <HeartHandshake className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-sm font-bold !text-[#0F172A]">Customer Satisfaction</h3>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 – OUR COMMITMENT / FINAL CTA
          Premium Deep Navy closing banner before website footer
      ========================================================================= */}
      <section className="pb-16 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#102A43] via-[#0b2238] to-[#063B5C] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-white/10">
            {/* Background Decorative Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D82B2]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl space-y-5">
              {/* Highlight Statement Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-cyan-200">
                <span>100+ Projects. Global Experience. One Commitment to Excellence.</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Building Trust Through Engineering Excellence
              </h2>

              {/* Description Paragraphs */}
              <div className="space-y-3.5 text-slate-200 text-sm sm:text-base leading-relaxed w-full max-w-5xl">
                <p>
                  At Peter Air Systems, quality is central to everything we do.
                </p>
                <p>
                  We are committed to delivering reliable HVAC and cleanroom solutions through engineering knowledge, responsible execution, quality workmanship and continuous improvement.
                </p>
                <p>
                  Our focus extends beyond project completion to creating lasting customer value through dependable solutions, professional service and long-term partnerships.
                </p>
              </div>

              {/* Tagline */}
              <p className="text-xs sm:text-sm font-semibold text-cyan-300 pt-1 tracking-wide uppercase">
                Engineering Controlled Environments. Delivering Quality. Building Trust.
              </p>

              {/* CTA Button */}
              <div className="pt-3">
                <Link
                  href="/contact-peter-air-systems/"
                  className="bg-[#1D82B2] hover:bg-[#166d96] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
