"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Settings2,
  Workflow,
  Lightbulb,
  Headphones,
  Layers,
  Wind,
  Gauge,
  Activity,
  DoorClosed,
  Wrench,
  FileCheck,
  Info,
  ChevronDown,
  MessageSquareText,
  Sliders,
  Sparkles,
  ClipboardCheck,
  Building2,
  ThermometerSnowflake,
  BarChart3
} from "lucide-react";

// 6 Core Services data strictly conforming to the user prompt specifications
const coreServices = [
  {
    id: "01",
    title: "Turnkey Cleanroom EPC Execution",
    description:
      "Complete cleanroom project execution, from concept development and engineering to installation and commissioning.",
    image: "/images/service-turnkey-cleanroom-epc.jpg",
    icon: Layers,
    badge: "EPC & Turnkey",
    components: [
      "Cleanroom layout planning and space utilization.",
      "HVAC system design and integration.",
      "Modular wall, ceiling and coving installation.",
      "Ductwork fabrication and thermal insulation.",
      "Electrical lighting and interlocking door integration."
    ]
  },
  {
    id: "02",
    title: "Pharmaceutical HVAC Design & Validation",
    description:
      "Specialized HVAC engineering solutions for pharmaceutical and controlled environments, focusing on air quality, temperature, humidity and pressure control.",
    image: "/images/hvac-systems-ducting.jpg",
    icon: Wind,
    badge: "Pharma HVAC",
    components: [
      "HVAC system design and engineering.",
      "Airflow and ventilation calculations.",
      "Temperature and humidity control planning.",
      "DQ, IQ, OQ and PQ support, as applicable.",
      "Testing and validation documentation."
    ]
  },
  {
    id: "03",
    title: "AHU Optimization & Energy Audits",
    description:
      "Improve the performance and energy efficiency of existing air handling systems through technical assessment and optimization.",
    image: "/images/service-ahu-optimization.jpg",
    icon: Gauge,
    badge: "Energy Efficiency",
    components: [
      "AHU performance assessment.",
      "Static pressure and airflow evaluation.",
      "Variable Frequency Drive (VFD) integration.",
      "Fan and blower performance optimization.",
      "Energy consumption assessment."
    ]
  },
  {
    id: "04",
    title: "Airflow Balancing & Filter Integrity Testing",
    description:
      "Technical testing and evaluation services to assess airflow performance, filtration integrity and environmental conditions.",
    image: "/images/service-airflow-balancing-testing.jpg",
    icon: Activity,
    badge: "Testing & Integrity",
    components: [
      "HEPA filter integrity testing.",
      "DOP/PAO aerosol testing, where offered.",
      "Air velocity measurement.",
      "Differential pressure testing.",
      "Non-viable particle counting."
    ]
  },
  {
    id: "05",
    title: "Specialized Cleanroom Solutions",
    description:
      "Specialized infrastructure and equipment solutions designed to support hygienic and controlled operating environments.",
    image: "/images/service-specialized-cleanroom.jpg",
    icon: DoorClosed,
    badge: "Infrastructure",
    components: [
      "Modular cleanroom wall and ceiling panels.",
      "Cleanroom doors and accessories.",
      "Static and dynamic pass boxes.",
      "Air showers and garment cubicles.",
      "HEPA filtration systems.",
      "Modular operation theatre solutions."
    ]
  },
  {
    id: "06",
    title: "Project Engineering & Technical Support",
    description:
      "Technical assistance and project coordination for cleanroom and HVAC installations, upgrades and system improvements.",
    image: "/images/service-project-engineering-team.jpg",
    icon: Wrench,
    badge: "Lifecycle Support",
    components: [
      "Engineering and design coordination.",
      "Technical specifications and documentation.",
      "Equipment and system integration.",
      "Installation supervision and coordination.",
      "Testing and commissioning assistance.",
      "Maintenance and technical support."
    ]
  }
];

// Testing and Validation capabilities
const validationCapabilities = [
  {
    title: "HEPA Filter Integrity Testing",
    desc: "DOP/PAO aerosol challenge scanning for pinhole leak detection and seal integrity."
  },
  {
    title: "Air Velocity Measurement",
    desc: "Air changes per hour (ACPH) calculation and airflow uniformity testing."
  },
  {
    title: "Differential Pressure Testing",
    desc: "Verification and tuning of room-to-room cascade pressure differentials."
  },
  {
    title: "Non-Viable Particle Counting",
    desc: "Airborne particle concentration measurement conforming to ISO 14644 classes."
  },
  {
    title: "Airflow Visualization",
    desc: "Smoke pattern visualization studies to confirm laminar flow and avoid turbulence."
  },
  {
    title: "Temperature & Humidity Monitoring",
    desc: "Continuous profiling and mapping to guarantee required psychrometric stability."
  },
  {
    title: "HVAC Performance Testing",
    desc: "System recovery rate testing, static pressure verification, and damper calibration."
  }
];

// Technical deliverables checklist
const technicalDeliverables = [
  "Engineering layouts and detailed technical drawings.",
  "HVAC load and airflow ventilation calculations.",
  "Equipment and system technical specifications.",
  "Cleanroom modular construction and assembly plans.",
  "HVAC system integration and ductwork schematics.",
  "Testing and performance evaluation reports.",
  "Applicable commissioning and validation documentation (DQ/IQ/OQ/PQ support).",
  "Technical recommendations and energy improvement reports."
];

// FAQ items
const faqItems = [
  {
    question: "What is included in turnkey cleanroom EPC execution?",
    answer:
      "Our turnkey EPC (Engineering, Procurement, Construction) execution covers every phase of cleanroom delivery: architectural concept layouts, HVAC thermodynamic calculations, modular wall and ceiling panel installation with flush coving, customized ductwork fabrication, electrical lighting and door interlocking integration, HEPA filtration setup, and comprehensive system commissioning."
  },
  {
    question: "What is the difference between HVAC design and HVAC validation?",
    answer:
      "HVAC design involves calculating heat loads, psychrometric parameters, duct sizes, fan capacities, and equipment selection to engineer a system that maintains specific cleanroom conditions. HVAC validation is the formal qualification process—encompassing DQ, IQ, OQ, and PQ—that documents and experimentally verifies that the installed system consistently complies with regulatory standards like Schedule M, WHO-GMP, and ISO 14644."
  },
  {
    question: "Why is HEPA filter integrity testing important?",
    answer:
      "HEPA filter integrity testing (using DOP/PAO aerosol challenges) scans the filter medium, frame, and perimeter seals for pinhole leaks or bypasses. Because even a sub-micron breach compromises cleanroom classification and risks product contamination, testing ensures that supply air enters sterile operating spaces with certified 99.97% to 99.99% filtration efficiency."
  },
  {
    question: "What are DQ, IQ, OQ and PQ?",
    answer:
      "These represent the 4 stages of qualification: Design Qualification (DQ) confirms that specifications meet user requirement specifications (URS); Installation Qualification (IQ) verifies that equipment and utilities are installed according to manufacturer and design criteria; Operational Qualification (OQ) tests that systems perform within established operating ranges; and Performance Qualification (PQ) proves sustained performance under real dynamic operational conditions."
  },
  {
    question: "Can existing HVAC systems be upgraded?",
    answer:
      "Yes. We conduct technical assessments and energy audits of existing air handling systems. Upgrades typically involve Variable Frequency Drive (VFD) integration, heat recovery wheel additions, airflow and static pressure rebalancing, motor replacements, and filtration redesign to lower electrical power draw while restoring strict environmental control."
  },
  {
    question: "What is airflow balancing?",
    answer:
      "Airflow balancing is the systematic measurement, adjustment, and regulation of air volume dampers and diffusers. It ensures each cleanroom receives its specified supply and exhaust volumes, achieves design air change rates (ACPH), and maintains accurate positive or negative pressure cascade barriers between adjacent zones."
  },
  {
    question: "Do you provide cleanroom installation and commissioning?",
    answer:
      "Yes. Our experienced engineering supervisors and technicians oversee on-site panel erection, airtight sealing, AHU rigging, ductwork joining, electrical connections, and commissioning procedures. We complete the project with functional verification and documentation handover."
  },
  {
    question: "How can I request a project quotation?",
    answer:
      "You can contact our engineering team through our website contact form, email your facility layout drawings and URS directly to sales@peterairs.com, or call our direct office line at +91 8484 836 337. Our technical estimators will review your requirements and provide a detailed scope breakdown."
  }
];

export const ServicesPageBody: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="services-page-body w-full bg-white text-[#475569] antialiased selection:bg-[#1D82B2] selection:text-white">
      {/* =========================================================================
          SUB-HERO PILL BAR: 5 Key Capabilities
          ========================================================================= */}
      <section className="w-full bg-white border-b border-[#E2E8F0] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 items-center">
            {[
              { label: "Engineering Excellence", icon: Settings2 },
              { label: "Quality Assurance", icon: ShieldCheck },
              { label: "Turnkey Solutions", icon: Workflow },
              { label: "Smart & Efficient Solutions", icon: Lightbulb },
              { label: "Dedicated Support", icon: Headphones }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 sm:gap-3 py-1 ${
                    idx !== 4 ? "md:border-r md:border-[#E2E8F0]/80 pr-2" : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F0F7FB] border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: OUR CORE SERVICES
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1D82B2] uppercase tracking-widest bg-[#F0F7FB] border border-[#DCE7F0] px-3.5 py-1 rounded-full mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 bg-[#1D82B2] rounded-full" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Our Core Services
            </h2>
            <div className="w-14 h-1.5 bg-[#1D82B2] rounded-full mx-auto mt-3.5 mb-4" />
            <p className="text-[#475569] text-base sm:text-lg leading-relaxed">
              Comprehensive engineering solutions for cleanroom, HVAC and controlled environment applications.
            </p>
          </div>

          {/* 6 Core Service Cards Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1D82B2]/60 transition-all duration-300 flex flex-col"
                >
                  {/* Card Image */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.title} title={service.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Number / Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="bg-[#094863]/90 backdrop-blur-xs text-white text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-white/20">
                        {service.id}
                      </span>
                      <span className="bg-white/90 backdrop-blur-xs text-[#094863] text-[11px] font-bold px-2 py-1 rounded-md shadow-xs">
                        {service.badge}
                      </span>
                    </div>

                    {/* Technical Icon Overlapping */}
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white text-[#1D82B2] shadow-md flex items-center justify-center border border-[#E2E8F0] group-hover:bg-[#1D82B2] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#1D82B2] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed">
                        {service.description}
                      </p>

                      {/* Key Components */}
                      <div className="pt-2">
                        <div className="text-[11px] font-bold text-[#1D82B2] uppercase tracking-wider mb-2">
                          Key Service Components:
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#475569]">
                          {service.components.map((comp, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1D82B2] shrink-0 mt-0.5 stroke-[2.2]" />
                              <span className="leading-snug">{comp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Learn More Action */}
                    <div className="pt-4 border-t border-[#F1F5F9] mt-auto">
                      <Link
                        href={`/contact-peter-air-systems/?service=${encodeURIComponent(
                          service.title
                        )}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D82B2] hover:text-[#094863] group/link transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TESTING & VALIDATION SERVICES (Split High-Tech Container)
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#DCE7F0] bg-gradient-to-br from-[#063B5C] via-[#094863] to-[#042433] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Technical Checklist & Details */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#55BAE8] uppercase tracking-widest bg-white/10 backdrop-blur-xs border border-white/15 px-3 py-1 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 bg-[#55BAE8] rounded-full" />
                    <span>TECHNICAL TESTING &amp; QUALIFICATION</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Testing &amp; Validation Services
                  </h2>
                  <div className="w-12 h-1 bg-[#1D82B2] rounded-full mt-3 mb-4" />
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
                    Technical testing and performance evaluation for controlled environments. We verify compliance with international standards including ISO 14644, Schedule M, and WHO-GMP.
                  </p>
                </div>

                {/* Capabilities Grid (2 columns on tablet/desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                  {validationCapabilities.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3.5 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#55BAE8] shrink-0 mt-0.5 stroke-[2.4]" />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact-peter-air-systems/?type=validation"
                    className="inline-flex items-center gap-2 bg-[#1D82B2] hover:bg-[#176a91] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Request Validation Support</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#55BAE8]" />
                    <span>Calibrated &amp; Traceable Instruments</span>
                  </span>
                </div>
              </div>

              {/* Right Column: High-Resolution Cleanroom Testing Visual */}
              <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full overflow-hidden bg-slate-900 border-t lg:border-t-0 lg:border-l border-white/10">
                <Image
                  src="/images/service-testing-validation-balometer.jpg"
                  alt="Peter Air Systems Cleanroom Testing and Validation Technician" title="Peter Air Systems Cleanroom Testing and Validation Technician"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#063B5C]/80 via-transparent to-transparent" />

                {/* Floating Technical HUD Badge */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-[#031720]/90 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl text-white max-w-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                        PARTICLE COUNT VERIFIED
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-[#1D82B2] px-2 py-0.5 rounded text-white">
                      ISO 14644
                    </span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-white tracking-tight">
                    0.3 µm – 5.0 µm
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Multi-channel non-viable particle monitoring &amp; velocity reporting.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 & SECTION 4: TECHNICAL SCOPE & FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* -------------------------------------------------------------
                LEFT COLUMN: SECTION 3 – TECHNICAL SCOPE & DELIVERABLES
                ------------------------------------------------------------- */}
            <div className="lg:col-span-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-7 sm:p-9 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1D82B2] uppercase tracking-widest bg-white border border-[#DCE7F0] px-3 py-1 rounded mb-3">
                  <span className="w-1.5 h-1.5 bg-[#1D82B2] rounded-full" />
                  <span>ENGINEERING OUTPUTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                  Technical Scope &amp; Deliverables
                </h2>
                <div className="w-12 h-1 bg-[#1D82B2] rounded-full mt-3 mb-4" />
                <p className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-6">
                  Understanding the technical outputs and documentation associated with our engineering services.
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-3">
                  {technicalDeliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-3.5 flex items-start gap-3 shadow-2xs hover:border-[#1D82B2]/50 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-md bg-[#F0F7FB] text-[#1D82B2] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-[#0F172A] leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope Note Banner */}
              <div className="mt-8 p-4 rounded-xl bg-white border border-[#DCE7F0] text-xs text-[#475569] leading-relaxed flex items-start gap-2.5 shadow-2xs">
                <Info className="w-4 h-4 text-[#1D82B2] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0F172A] font-semibold">Important Notice:</strong> Final deliverables and specific documentation dossiers depend on the mutually agreed project scope and contractual technical specifications.
                </span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: SECTION 4 – FREQUENTLY ASKED QUESTIONS
                ------------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1D82B2] uppercase tracking-widest bg-[#F0F7FB] border border-[#DCE7F0] px-3 py-1 rounded mb-3">
                  <span className="w-1.5 h-1.5 bg-[#1D82B2] rounded-full" />
                  <span>KNOWLEDGE BASE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                  Frequently Asked Questions
                </h2>
                <div className="w-12 h-1 bg-[#1D82B2] rounded-full mt-3 mb-4" />
                <p className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-6">
                  Find answers to common questions about our cleanroom and HVAC engineering services.
                </p>

                {/* Accordion FAQ Items */}
                <div className="space-y-3">
                  {faqItems.map((item, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#F8FAFC] transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm md:text-base text-[#0F172A] flex items-center justify-between gap-4 hover:text-[#1D82B2] transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="leading-snug">{item.question}</span>
                          <span
                            className={`w-6 h-6 rounded-full bg-white border border-[#DCE7F0] text-[#1D82B2] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180 bg-[#1D82B2] text-white" : ""
                            }`}
                          >
                            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0]/70 pt-3 bg-white">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Query Card */}
              <div className="mt-8 p-5 rounded-xl bg-[#F0F7FB] border border-[#DCE7F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">
                    Have a project-specific technical question?
                  </h4>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Our HVAC and cleanroom specialists are available to review your URS.
                  </p>
                </div>
                <Link
                  href="/contact-peter-air-systems/"
                  className="bg-[#094863] hover:bg-[#063549] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                  Contact Engineers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TECHNICAL CONSULTATION CTA BANNER
          ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#031720] via-[#094863] to-[#042433] text-white p-8 sm:p-10 lg:p-12 border border-[#063B5C]">
            {/* Subtle Industrial Background Image */}
            <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
              <Image
                src="/images/cleanroom-epc-hero.jpg"
                alt="Peter Air Systems Engineering Background" title="Peter Air Systems Engineering Background"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Content */}
              <div className="flex items-start gap-4 sm:gap-5 max-w-2xl">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1D82B2] text-white flex items-center justify-center shrink-0 shadow-lg">
                  <MessageSquareText className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    Request a Technical Consultation
                  </h2>
                  <p className="text-slate-200 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
                    Discuss your cleanroom and HVAC requirements with our engineering team. Let us help you explore suitable solutions for your facility.
                  </p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto shrink-0">
                <Link
                  href="/contact-peter-air-systems/"
                  className="inline-flex items-center justify-center gap-2 bg-[#1D82B2] hover:bg-[#176a91] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Contact Our Engineers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact-peter-air-systems/?type=quotation"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all"
                >
                  <span>Request a Project Quotation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
