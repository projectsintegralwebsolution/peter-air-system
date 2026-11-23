import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  Fan,
  Wrench,
  ClipboardCheck,
  ShieldCheck,
  HardHat,
  ArrowRight,
  DraftingCompass,
} from "lucide-react";

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Engineering Design",
    desc: "CFM calculations, air flow balance & 3D layout",
    icon: DraftingCompass,
  },
  {
    step: "02",
    title: "In-House Fabrication",
    desc: "Sheet metal panels, framing & coving",
    icon: Factory,
  },
  {
    step: "03",
    title: "HVAC Integration",
    desc: "AHU, ducting, chillers & dehumidifiers",
    icon: Fan,
  },
  {
    step: "04",
    title: "On-Site Installation",
    desc: "Airtight modular assembly & doors",
    icon: Wrench,
  },
  {
    step: "05",
    title: "Testing & Balancing",
    desc: "DOP/PAO aerosol leak & particle counts",
    icon: ClipboardCheck,
  },
  {
    step: "06",
    title: "Validation Support",
    desc: "DQ, IQ, OQ documentation & dossier",
    icon: ShieldCheck,
  },
];

export default function TurnkeyCleanroomSection() {
  return (
    <section className="py-16 sm:py-[86px] bg-white relative overflow-hidden">
      {/* Subtle ambient cyan/light-blue background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00B8D4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#003858]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. SECTION HEADER AND HERO (TWO COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-[65px]">
          {/* Left Column: Heading, Badge, Description */}
          <div className="lg:col-span-7 space-y-4">
            {/* Small Section Label: Light blue background with cyan border */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#003858] uppercase bg-[#F0F9FB] border border-[#00B8D4] px-3.5 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D93636] shrink-0" />
              <span>TURNKEY CLEANROOM EPC</span>
            </div>

            {/* Main Heading: Dark Navy (#071028), Concept to Validation in Primary Blue (#003858) */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#071028] tracking-tight leading-[1.18]">
              Turnkey Cleanroom Solutions:{" "}
              <span className="text-[#003858] block sm:inline">Concept to Validation</span>
            </h2>

            {/* Decorative Underline: Cyan (#00B8D4) */}
            <div className="w-12 h-1 bg-[#00B8D4] rounded-full" />

            {/* Description: Body Text (#46566B) */}
            <p className="text-[#46566B] text-base sm:text-lg leading-relaxed max-w-2xl font-normal pt-1">
              Complete Cleanroom Solutions, From Concept and Engineering to Installation and Validation.
            </p>
          </div>

          {/* Right Column: Cleanroom Corridor Image with subtle cyan and light-blue decorative gradients */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-md border border-[#E2EBF0] group bg-[#F5F7FA]">
              <Image
                src="/images/cleanroom-epc-hero.jpg"
                alt="Peter Air Systems Cleanroom Corridor and Modular Cleanroom Facilities" title="Peter Air Systems Cleanroom Corridor and Modular Cleanroom Facilities"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority={false}
              />
              {/* Subtle cyan and light-blue decorative border/glow gradients without heavy overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00B8D4]/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2. SIX-STEP CONNECTED HORIZONTAL TIMELINE */}
        <div className="relative mb-12 sm:mb-[65px]">
          {/* Continuous Cyan (#00B8D4) connecting timeline behind circles on desktop */}
          <div className="hidden lg:block absolute left-0 right-0 top-10 w-full pointer-events-none z-0">
            <svg
              className="w-full h-14"
              viewBox="0 0 1200 50"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 50,25 Q 150,5 250,25 T 450,25 T 650,25 T 850,25 T 1050,25 T 1150,25"
                stroke="#00B8D4"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeOpacity="0.85"
                fill="none"
              />
            </svg>
          </div>

          {/* 6 Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-4 relative z-10">
            {PROCESS_STEPS.map((s) => {
              const IconComp = s.icon;
              return (
                <div
                  key={s.step}
                  className="flex flex-col items-center group transition-all duration-300"
                >
                  {/* Circular Icon Container: White background, Primary Blue (#003858) icon */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-full bg-white shadow-md border-2 border-[#E2EBF0] flex items-center justify-center text-[#003858] group-hover:border-[#00B8D4] group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                      <IconComp className="w-9 h-9 stroke-[1.8] text-[#003858]" />
                    </div>
                    {/* Number Badge: Primary Blue (#003858) with white number */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#003858] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                      {s.step}
                    </div>
                  </div>

                  {/* Process Card: White, Subtle Light-Blue Border, Heading Navy (#071028), Body Text (#46566B) */}
                  <div className="w-full bg-white rounded-2xl border border-[#E2EBF0] shadow-xs p-4 sm:p-5 text-center group-hover:border-[#00B8D4] group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-start min-h-[140px]">
                    <h3 className="font-bold text-[#071028] text-sm mb-1.5 leading-snug group-hover:text-[#003858] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[#46566B] text-xs leading-relaxed">
                      {s.desc}
                    </p>

                    {/* Bottom Card Accent: Cyan (#00B8D4) */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00B8D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. BOTTOM CTA BANNER: Dark Navy (#002840) to Primary Blue (#003858) Gradient */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#002840] via-[#00304C] to-[#003858] p-6 sm:p-8 lg:p-10 text-white shadow-xl">
          {/* Engineering Room Perspective Linework in Cyan (#00B8D4) */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg
              className="w-full h-full text-[#00B8D4]"
              viewBox="0 0 800 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L200,80 L200,120 L0,200" />
              <path d="M800,0 L600,80 L600,120 L800,200" />
              <rect x="200" y="80" width="400" height="40" />
              <line x1="200" y1="80" x2="600" y2="80" />
              <line x1="200" y1="120" x2="600" y2="120" />
              <line x1="300" y1="80" x2="300" y2="120" />
              <line x1="400" y1="80" x2="400" y2="120" />
              <line x1="500" y1="80" x2="500" y2="120" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Engineer Icon & Copy */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 text-center sm:text-left">
              {/* HardHat / Engineering Illustration in Cyan (#00B8D4) */}
              <div className="w-16 h-16 rounded-full bg-[#00B8D4]/10 backdrop-blur-sm border border-[#00B8D4]/30 flex items-center justify-center shrink-0 shadow-inner">
                <HardHat className="w-8 h-8 text-[#00B8D4]" />
              </div>

              {/* Vertical divider on tablet/desktop */}
              <div className="hidden sm:block w-px h-12 bg-white/20 shrink-0" />

              <div className="space-y-1.5 max-w-2xl">
                {/* Heading: White (#FFFFFF) */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Planning a New Cleanroom or Modular OT Project?
                </h3>
                {/* Description: White with slightly reduced opacity */}
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Consult with our senior cleanroom application engineers. We evaluate your heat load, classification requirements (ISO 14644-1), and pressure cascade schematics.
                </p>
              </div>
            </div>

            {/* CTA Button: White background with Dark Navy (#002840) text, hover Cyan (#00B8D4) with white text */}
            <Link
              href="/cleanroom-turnkey-solution/"
              className="inline-flex items-center gap-2.5 bg-white text-[#002840] hover:bg-[#00B8D4] hover:text-white font-bold px-7 py-3.5 rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0 group hover:-translate-y-0.5"
            >
              <span>Explore Cleanroom Solutions</span>
              <ArrowRight className="w-4 h-4 text-[#003858] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
