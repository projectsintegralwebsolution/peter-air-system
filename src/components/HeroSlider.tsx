"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, PhoneCall } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";

export interface SlideData {
  id: number;
  slideNumber: string;
  badge: string;
  heading: string;
  highlightWord: string;
  supportingText: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnAction: "modal" | "link";
  secondaryBtnLink?: string;
  image: string;
  technicalSpecs: string[];
}

export const defaultSlides: SlideData[] = [
  {
    id: 1,
    slideNumber: "01",
    badge: "CUSTOM HVAC & AIR HANDLING SYSTEMS",
    heading: "Precision-Engineered Air Handling Units & HVAC Systems",
    highlightWord: "Air Handling Units",
    supportingText: "Custom double-skin thermal-break Air Handling Units (AHU), Air Washers, and Industrial Dehumidifiers engineered for pharmaceutical GMP, healthcare, and critical industrial environments.",
    primaryBtnText: "Explore AHU Systems",
    primaryBtnLink: "/air-handling-unit-ahu/",
    secondaryBtnText: "Request Technical Quote",
    secondaryBtnAction: "modal",
    image: "/images/hero-banner-1.png",
    technicalSpecs: ["Thermal Break Profiles", "PUF Insulated 40 kg/m³", "Eurovent / ISO Standards", "Direct Drive / VFD Ready"],
  },
  {
    id: 2,
    slideNumber: "02",
    badge: "SS 304 / SS 316 CONTAMINATION CONTROL",
    heading: "Advanced Cleanroom Equipment & Laminar Workstations",
    highlightWord: "Cleanroom Equipment",
    supportingText: "Static & Dynamic Pass Boxes, High-Velocity Air Showers, Bio Safety Cabinets, Dispensing Booths, and Laminar Workstations built with zero-leakage HEPA containment.",
    primaryBtnText: "View Cleanroom Equipment",
    primaryBtnLink: "/clean-room-equipment/",
    secondaryBtnText: "Talk to Our Engineers",
    secondaryBtnAction: "link",
    secondaryBtnLink: "/contact-peter-air-systems/",
    image: "/images/hero-banner-2.png",
    technicalSpecs: ["SS 304 / SS 316 Construction", "99.997% HEPA Filtration", "Electromagnetic Interlocks", "UV Sterilization Cycle"],
  },
  {
    id: 3,
    slideNumber: "03",
    badge: "PRECISION AIR DISTRIBUTION & FILTRATION",
    heading: "Certified Air Filtration & Distribution Networks",
    highlightWord: "Filtration Networks",
    supportingText: "Heavy-gauge Galvanized and Stainless Steel HVAC ducting, HEPA Terminal Boxes, Aerodynamic Diffusers, Return Air Risers, and Microvee/HEPA filtration media.",
    primaryBtnText: "Explore Air Distribution",
    primaryBtnLink: "/hvac-products/",
    secondaryBtnText: "Download Catalog",
    secondaryBtnAction: "modal",
    image: "/images/hero-banner-3.png",
    technicalSpecs: ["H13 & H14 Certified HEPA", "Aerodynamic Airfoil Dampers", "Airtight Flanged Joints", "Low Noise & Low Pressure Drop"],
  },
  {
    id: 4,
    slideNumber: "04",
    badge: "TURNKEY CLEANROOM EPC & STERILIZATION",
    heading: "Turnkey Cleanroom Solutions & Contamination Control",
    highlightWord: "Turnkey Cleanrooms",
    supportingText: "Concept-to-commissioning modular cleanrooms, pass boxes, air showers, and sterilizer chambers. Complete with airtight GMP doors and laminar airflow distribution.",
    primaryBtnText: "Explore Turnkey Solutions",
    primaryBtnLink: "/cleanroom-turnkey-solution/",
    secondaryBtnText: "Get Project Estimation",
    secondaryBtnAction: "modal",
    image: "/images/hero-banner-4.png",
    technicalSpecs: ["ISO Class 1 to Class 8", "Flush Modular Paneling", "Airtight Hermetic Doors", "Complete DQ/IQ/OQ Dossier"],
  },
];

interface HeroSliderProps {
  initialSlides?: SlideData[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ initialSlides }) => {
  const slides = (initialSlides && initialSlides.length > 0) ? initialSlides : defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <div
      className="relative w-full h-[430px] sm:h-[480px] lg:h-[530px] xl:h-[550px] bg-slate-100 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with #063B5C overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                priority={index === 0}
                className="object-cover object-right"
              />
              {/* Dedicated Overlay in #063B5C */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ backgroundColor: "rgba(6, 59, 92, 0.50)" }}
                aria-hidden="true"
              />
            </div>

            {/* Slide Content: Positioned on Left to preserve products on the Right */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-4">
                {/* Tech Badge */}
                <div className="inline-flex items-center gap-2 bg-[#063B5C]/90 border border-cyan-400/40 text-cyan-200 px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold tracking-wider shadow-sm backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#D93636] animate-pulse"></span>
                  <span>{slide.badge}</span>
                </div>

                {/* Primary Heading: High contrast white on #063B5C overlay (H1 for first slide, H2 for secondary slides) */}
                {index === 0 ? (
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold !text-white tracking-tight leading-[1.15] drop-shadow-sm"
                    style={{ color: "#FFFFFF" }}
                  >
                    {slide.heading}
                  </h1>
                ) : (
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold !text-white tracking-tight leading-[1.15] drop-shadow-sm"
                    style={{ color: "#FFFFFF" }}
                  >
                    {slide.heading}
                  </h2>
                )}

                {/* Supporting Text */}
                <p className="text-slate-100 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal drop-shadow-xs line-clamp-2 sm:line-clamp-none">
                  {slide.supportingText}
                </p>

                {/* Technical Specs Strip */}
                <div className="hidden sm:flex flex-wrap gap-2 pt-0.5">
                  {slide.technicalSpecs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-slate-950/40 border border-white/20 px-2.5 py-0.5 rounded-md shadow-2xs backdrop-blur-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>

                {/* Call to Actions */}
                <div className="pt-1 sm:pt-2 flex flex-wrap gap-3 items-center">
                  <Link
                    href={slide.primaryBtnLink}
                    className="group inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#063B5C] font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5"
                  >
                    <span>{slide.primaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 text-[#063B5C] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {slide.secondaryBtnAction === "modal" ? (
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-white border border-cyan-300/50 font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm backdrop-blur-xs"
                    >
                      <span>{slide.secondaryBtnText}</span>
                    </button>
                  ) : (
                    <Link
                      href={slide.secondaryBtnLink || "/contact-peter-air-systems/"}
                      className="inline-flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-white border border-cyan-300/50 font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm backdrop-blur-xs"
                    >
                      <PhoneCall className="w-4 h-4 text-cyan-300" />
                      <span>{slide.secondaryBtnText}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls: Clean, modern controls on dark-tinted background */}
      <div className="absolute z-30 bottom-4 sm:bottom-5 right-5 sm:right-10 flex items-center gap-2.5">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#063B5C] border border-white/30 shadow-md backdrop-blur-md transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#063B5C] border border-white/30 shadow-md backdrop-blur-md transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Slide Indicators with Numbers */}
      <div className="absolute z-30 bottom-4 sm:bottom-5 left-5 sm:left-12 flex items-center gap-3">
        {slides.map((s, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group flex items-center gap-2 focus:outline-none"
          >
            <span
              className={`text-xs font-semibold transition-colors duration-300 ${
                index === currentSlide ? "text-cyan-300" : "text-white/70 group-hover:text-white"
              }`}
            >
              {s.slideNumber}
            </span>
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-cyan-400" : "w-3 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sourceContext="Hero Slider CTA"
      />
    </div>
  );
};
