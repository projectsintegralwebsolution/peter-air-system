"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Settings,
  HelpCircle,
  Layers,
  Wind,
  Cpu,
  Droplets,
  Activity,
  Flame,
  ArrowRight,
  Gauge,
  Sliders,
  Check,
  ChevronDown,
  Building2,
  FileCheck,
  Search
} from "lucide-react";
import { decodeHtmlEntities } from "@/lib/textUtils";

interface AhuProductDetailProps {
  product: any;
}

// 20 Standard Models reproduced from the reference catalogue (Page 13)
const ahuStandardModels = [
  { model: "PAS-AHU-002", w: 770, h: 470, l: 1770, stdM3h: 2000, minM3h: 648, maxM3h: 2592, btu: 24000, kw: 7.0, category: "compact" },
  { model: "PAS-AHU-003", w: 770, h: 770, l: 2070, stdM3h: 3000, minM3h: 1296, maxM3h: 5184, btu: 48000, kw: 14.1, category: "compact" },
  { model: "PAS-AHU-005", w: 770, h: 1070, l: 2370, stdM3h: 5000, minM3h: 1944, maxM3h: 7776, btu: 100000, kw: 29.3, category: "compact" },
  { model: "PAS-AHU-006", w: 770, h: 1370, l: 2670, stdM3h: 6000, minM3h: 2592, maxM3h: 10368, btu: 120000, kw: 35.2, category: "compact" },
  { model: "PAS-AHU-008", w: 770, h: 1670, l: 3120, stdM3h: 8000, minM3h: 3240, maxM3h: 12960, btu: 160000, kw: 46.9, category: "compact" },
  { model: "PAS-AHU-010", w: 770, h: 1970, l: 3570, stdM3h: 10000, minM3h: 3888, maxM3h: 15552, btu: 200000, kw: 58.6, category: "medium" },
  { model: "PAS-AHU-012", w: 1370, h: 1470, l: 2670, stdM3h: 12000, minM3h: 5184, maxM3h: 20736, btu: 240000, kw: 70.3, category: "medium" },
  { model: "PAS-AHU-016", w: 1370, h: 1770, l: 3120, stdM3h: 16000, minM3h: 6480, maxM3h: 25920, btu: 320000, kw: 93.8, category: "medium" },
  { model: "PAS-AHU-020", w: 1370, h: 2070, l: 3570, stdM3h: 20000, minM3h: 7776, maxM3h: 31104, btu: 400000, kw: 117.2, category: "medium" },
  { model: "PAS-AHU-025", w: 1670, h: 2070, l: 3570, stdM3h: 25000, minM3h: 9720, maxM3h: 38880, btu: 480000, kw: 140.7, category: "medium" },
  { model: "PAS-AHU-030", w: 1970, h: 2070, l: 3570, stdM3h: 30000, minM3h: 11664, maxM3h: 46656, btu: 600000, kw: 175.8, category: "medium" },
  { model: "PAS-AHU-035", w: 1970, h: 2420, l: 4020, stdM3h: 35000, minM3h: 13608, maxM3h: 54432, btu: 680000, kw: 199.3, category: "high" },
  { model: "PAS-AHU-040", w: 1970, h: 2720, l: 4470, stdM3h: 40000, minM3h: 15552, maxM3h: 62208, btu: 780000, kw: 228.6, category: "high" },
  { model: "PAS-AHU-045", w: 2270, h: 2720, l: 4470, stdM3h: 45000, minM3h: 18144, maxM3h: 72576, btu: 900000, kw: 263.8, category: "high" },
  { model: "PAS-AHU-050", w: 2570, h: 2720, l: 4470, stdM3h: 50000, minM3h: 20736, maxM3h: 82944, btu: 1000000, kw: 293.1, category: "high" },
  { model: "PAS-AHU-060", w: 2870, h: 2770, l: 4470, stdM3h: 60000, minM3h: 23328, maxM3h: 93312, btu: 120000, kw: 351.7, category: "high" },
  { model: "PAS-AHU-070", w: 3170, h: 2770, l: 4470, stdM3h: 70000, minM3h: 25920, maxM3h: 103680, btu: 1300000, kw: 381.0, category: "high" },
  { model: "PAS-AHU-080", w: 3770, h: 2770, l: 4470, stdM3h: 80000, minM3h: 31104, maxM3h: 124416, btu: 1600000, kw: 468.9, category: "high" },
  { model: "PAS-AHU-090", w: 4370, h: 2770, l: 4470, stdM3h: 90000, minM3h: 36288, maxM3h: 145152, btu: 1800000, kw: 527.5, category: "high" },
  { model: "PAS-AHU-100", w: 4970, h: 2770, l: 4470, stdM3h: 100000, minM3h: 41472, maxM3h: 165888, btu: 2000000, kw: 586.2, category: "high" },
];

export const AhuProductDetail: React.FC<AhuProductDetailProps> = ({ product }) => {
  const [modelFilter, setModelFilter] = useState<"all" | "compact" | "medium" | "high">("all");
  const [unitMode, setUnitMode] = useState<"m3h" | "cfm">("m3h");
  const [activeTab, setActiveTab] = useState<"specs" | "construction" | "fans" | "coils" | "desiccant">("specs");

  const filteredModels = ahuStandardModels.filter(
    (m) => modelFilter === "all" || m.category === modelFilter
  );

  return (
    <div className="space-y-14">
      {/* 1. HERO BOX WITH ENHANCED TECHNICAL HIGHLIGHTS */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center shadow-sm">
        <div className="md:col-span-5 relative h-64 sm:h-72 w-full bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-center overflow-hidden group">
          <Image
            src={product.image || "/images/AHU.jpeg"}
            alt="Double-Skin Thermal-Break Air Handling Unit (AHU) manufactured by Peter Air Systems in India"
            title="Peter Air Systems Air Handling Unit (AHU) Manufacturer in India"
            fill
            priority
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-[#063B5C] text-white text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
            <span>ISO 9001:2015 & CE CERTIFIED</span>
          </span>
          <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200 text-[10.5px] font-semibold px-2 py-0.5 rounded shadow-sm">
            India & Vietnam Supply
          </span>
        </div>

        <div className="md:col-span-7 min-w-0 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-700 uppercase tracking-widest bg-brand-50 border border-brand-200/80 px-2.5 py-1 rounded">
            <span>HEAVY-DUTY INDUSTRIAL HVAC & CLEANROOM AHU</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Custom Air Handling Units (AHU) Built for India & Vietnam
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            As an established <strong>Air Handling Units manufacturer in India</strong> with our head office in Vasai West and manufacturing plant in Vasai East, Mumbai, Peter Air Systems builds custom <strong>Double-Skin Thermal-Break Air Handling Units (AHUs)</strong> for industrial and cleanroom projects. We supply and export directly to pharmaceutical plants, hospital operating theatres, electronics cleanrooms, and food facilities across <strong>India</strong> and <strong>Vietnam</strong> (including Ho Chi Minh City, Hanoi, Bac Ninh, and Binh Duong). Each unit is sized around your exact airflow, static pressure, and humid tropical climate load so temperature, RH, and particle counts stay within spec year-round.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <span className="bg-white border border-slate-300 text-slate-800 text-[11px] px-3 py-1 rounded-md font-semibold shadow-sm">
              Capacity: 500 to 200,000 CMH (1,000 – 40,000+ CFM)
            </span>
            <span className="bg-white border border-slate-300 text-slate-800 text-[11px] px-3 py-1 rounded-md font-semibold shadow-sm">
              Double-Skin PUF: 25mm / 45mm / 50mm (40 kg/m³)
            </span>
            <span className="bg-white border border-slate-300 text-slate-800 text-[11px] px-3 py-1 rounded-md font-semibold shadow-sm">
              Extruded Thermal Break Aluminum Pentapost
            </span>
            <span className="bg-white border border-slate-300 text-slate-800 text-[11px] px-3 py-1 rounded-md font-semibold shadow-sm">
              Direct-Drive Plug / Belt Centrifugal Blower
            </span>
            <span className="bg-white border border-slate-300 text-slate-800 text-[11px] px-3 py-1 rounded-md font-semibold shadow-sm">
              Pharma cGMP & Schedule M Compliant
            </span>
          </div>
        </div>
      </div>

      {/* 2. OVERALL AHU STRUCTURE & AIRFLOW SCHEMATIC (PDF Page 7 Reference) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-[11px] font-mono tracking-widest text-[#D93636] uppercase font-bold block mb-1">
            SCHEMATIC ARCHITECTURE & INTERNAL COMPONENT SEQUENCE
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Complete Air Handling Unit Structure & Treatment Train
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Engineered modular arrangement illustrating progressive air filtration, thermal conditioning, droplet elimination, and aerodynamic fan discharge based on certified technical standards.
          </p>
        </div>

        {/* Visual Component Sequence Flowchart */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden shadow-inner">
          <div className="text-xs font-mono text-cyan-400 font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>Airflow Flowpath Sequence (Intake → Filtration → Cooling → Reheat → Blower)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {/* Step 1 */}
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-mono text-cyan-400">STAGE 01</span>
              <h5 className="font-bold text-xs text-white mt-1">Filter G4</h5>
              <p className="text-[11px] text-slate-400 mt-1">Washable synthetic pre-filter for coarse dust & debris capture.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-mono text-cyan-400">STAGE 02</span>
              <h5 className="font-bold text-xs text-white mt-1">Filter F8 / F9</h5>
              <p className="text-[11px] text-slate-400 mt-1">Microvee fine pocket/bag filters for submicron dust arrestance.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-mono text-cyan-400">STAGE 03</span>
              <h5 className="font-bold text-xs text-white mt-1">Cooling Coil</h5>
              <p className="text-[11px] text-slate-400 mt-1">DX / Chilled Water copper tubes with hydrophilic aluminum fins.</p>
            </div>
            {/* Step 4 */}
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-mono text-cyan-400">STAGE 04</span>
              <h5 className="font-bold text-xs text-white mt-1">Water Shield</h5>
              <p className="text-[11px] text-slate-400 mt-1">Droplet eliminator preventing moisture carryover into ducts.</p>
            </div>
            {/* Step 5 */}
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-mono text-cyan-400">STAGE 05</span>
              <h5 className="font-bold text-xs text-white mt-1">Heater Section</h5>
              <p className="text-[11px] text-slate-400 mt-1">Electric heating elements with dual thermal cut-off safety.</p>
            </div>
            {/* Step 6 */}
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-mono text-cyan-400">STAGE 06</span>
              <h5 className="font-bold text-xs text-white mt-1">Blower Section</h5>
              <p className="text-[11px] text-slate-400 mt-1">Direct-drive plug fan or belt-driven centrifugal aerofoil blower.</p>
            </div>
          </div>
        </div>

        {/* Technical Photo & Inspection Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
          <div className="md:col-span-6 relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
            <Image
              src="/images/ahu/ahu-internal-component-layout.jpg"
              alt="Air Handling Unit internal component layout showing G4/F8 filters, cooling coil, manometer ports, and blower section"
              title="AHU Internal Component Layout & Inspection Access"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] font-medium flex items-center justify-between">
              <span>Internal Inspection Access & Manometer Taps</span>
              <span className="text-cyan-300 font-mono">Zero Air Bypass</span>
            </div>
          </div>

          <div className="md:col-span-6 space-y-3">
            <h4 className="text-base font-bold text-slate-900">
              Dual-Door Access & Airtight Sealing Integrity
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Every Peter Air Systems AHU features modular inspection doors equipped with double hollow neoprene gaskets, heavy-duty nylon handles with safety latches, and double-glazed tempered viewing ports. Differential pressure gauge ports across each filter stage enable real-time tracking of filter saturation without interrupting operations.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D93636] shrink-0" />
                <span>Pressure taps pre-piped for Magnehelic gauges or digital pressure transmitters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D93636] shrink-0" />
                <span>Marine-grade internal LED inspection lights with external control switch</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D93636] shrink-0" />
                <span>Stainless steel SS 304 sloped drain pan preventing standing moisture</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. STRUCTURAL CONSTRUCTION: FRAME, BASE, AND PANELS (PDF Pages 8 & 9 Reference) */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-[11px] font-mono tracking-widest text-[#D93636] uppercase font-bold block mb-1">
            ADVANCED ENCLOSURE ENGINEERING
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Frame Profiles, Double-Skin Panels & Thermal-Break Insulation
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Built to stop thermal bridging and exterior sweating in humid Indian and Vietnamese plantrooms, with rigid casing strength for continuous 24/7 duty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1: Extruded Thermal Break Aluminum Frame */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-200 bg-white mb-4">
                <Image
                  src="/images/ahu/ahu-thermal-break-frame.jpg"
                  alt="Extruded Aluminum Pentapost AHU Frame with Polyamide Thermal Break Profile"
                  title="Thermal-Break Extruded Aluminum AHU Frame Profile"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#063B5C] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  FRAMEWORK
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Thermal-Break Aluminum Profile</h4>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Extruded hollow aluminum pentapost framework incorporating polyamide composite thermal-break insulation bridges. This separates the cold internal air stream from warm ambient air, preventing casing condensation in coastal Indian and Vietnamese climates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
              <span>Insulated Corner Joints</span>
              <span className="text-[#063B5C]">Molded Composite Bridge</span>
            </div>
          </div>

          {/* Item 2: Double-Skin PU Panels */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-200 bg-white mb-4">
                <Image
                  src="/images/ahu/ahu-double-skin-pu-panel.jpg"
                  alt="Double-Skin Polyurethane Foam (PUF) Insulated AHU Panel Section"
                  title="Double-Skin PUF Insulated AHU Casing Panel"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#063B5C] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  CASING
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Double-Skin PUF Panels</h4>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Sandwich panels available in 25mm, 45mm, and 50mm thickness injected with high-density (40 kg/m³) CFC/HFC-free Polyurethane Foam. Removable panel locks simplify servicing inside tight plantrooms while keeping air leakage and noise low.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
              <span>Skin Options</span>
              <span className="text-[#063B5C]">Pre-Coated GI / SS 304 / SS 316</span>
            </div>
          </div>

          {/* Item 3: Heavy-Duty Base Frame */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-200 bg-white mb-4">
                <Image
                  src="/images/ahu/ahu-galvanized-base-frame.jpg"
                  alt="Heavy-Duty Hot-Dip Galvanized Steel AHU Base Frame with Rigging Lifting Holes"
                  title="Galvanized Steel Base Frame for Air Handling Units"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#063B5C] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  BASE
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Rigid Galvanized Base Frame</h4>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Fabricated from heavy-gauge hot-dip galvanized steel channel sections designed to support the entire dynamic weight of coils, fan assemblies, and filters. Precision laser-cut lifting holes ensure safe crane rigging and forklift transport without casing deformation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
              <span>Corrosion Protection</span>
              <span className="text-[#063B5C]">Hot-Dip Galvanized + Powder Coat</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BLOWER & MOTOR CONFIGURATIONS: DIRECT-DRIVE VS BELT-DRIVEN (PDF Pages 10 & 11 Reference) */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-[11px] font-mono tracking-widest text-[#D93636] uppercase font-bold block mb-1">
            AERODYNAMIC DRIVE SELECTION
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Direct-Drive Plug Fans vs. Heavy-Duty Belt-Driven Centrifugal Blowers
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Engineered fan selections tailored to exact airflow (m³/h / CFM), static pressure head (Pa / mm WG), and particulate cleanliness standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card A: Direct Drive Plug Fan */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-700 font-bold uppercase tracking-wider block">
                  RECOMMENDED FOR PHARMA & CLEANROOMS
                </span>
                <h4 className="text-lg font-bold text-slate-900">Direct-Drive Plug Fan</h4>
              </div>
              <span className="bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-bold px-2.5 py-1 rounded">
                Zero Belt Dust
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-36 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <Image
                  src="/images/ahu/ahu-direct-drive-plug-fan.jpg"
                  alt="Direct Drive Plug Fan for Cleanroom Air Handling Units"
                  title="Direct-Drive Plug Fan for Cleanroom AHU"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="relative h-36 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <Image
                  src="/images/ahu/ahu-plug-fan-assembly.jpg"
                  alt="Unhoused Backward Curved Plug Fan Impeller Assembly for AHU"
                  title="Backward-Curved Plug Fan Impeller Assembly"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              In cleanroom applications, standard drive belts shed rubber micro-particulates over time. Peter Air Systems direct-drive plug fans couple the 3-phase high-efficiency motor directly to a backward-curved aerofoil impeller, completely eliminating belts, pulleys, and particulate contamination.
            </p>

            <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 border border-slate-200/80 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Airflow Range:</span>
                <span className="font-bold text-slate-800">600 m³/h – 60,000 m³/h (350 – 35,300 CFM)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Pressure Head:</span>
                <span className="font-bold text-slate-800">150 Pa – 1,000 Pa</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Motor Capacity:</span>
                <span className="font-bold text-slate-800">0.1 kW – 30 kW (3-Phase IE3/IE4)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">VFD Compatibility:</span>
                <span className="font-bold text-cyan-700">100% Inverter Variable Speed Modulation</span>
              </div>
            </div>
          </div>

          {/* Card B: Belt-Driven Centrifugal Fan */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-brand-700 font-bold uppercase tracking-wider block">
                  HIGH STATIC PRESSURE & LARGE AIRFLOW
                </span>
                <h4 className="text-lg font-bold text-slate-900">Centrifugal Fan with Belt Drive</h4>
              </div>
              <span className="bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-bold px-2.5 py-1 rounded">
                High Volume
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-36 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <Image
                  src="/images/ahu/ahu-belt-driven-centrifugal-fan.jpg"
                  alt="Belt-Driven Centrifugal Blower Fan on Galvanized AHU Skid Frame"
                  title="Belt-Driven Centrifugal Blower Fan for AHU"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="relative h-36 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <Image
                  src="/images/ahu/ahu-high-durability-blower-motor.jpg"
                  alt="Three Phase Heavy-Duty AHU Blower Motor with Anti-Vibration Mounts"
                  title="Three-Phase Heavy-Duty AHU Blower Motor"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for large commercial complexes, manufacturing workshops, and high-CFM ventilation systems. Featuring double-inlet double-width (DIDW) impellers fabricated from hot-dip galvanized steel, statically and dynamically balanced to ISO 1940 standards for ultra-quiet performance.
            </p>

            <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 border border-slate-200/80 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Airflow Range:</span>
                <span className="font-bold text-slate-800">1,000 m³/h – 150,000 m³/h (590 – 88,300 CFM)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Pressure Head:</span>
                <span className="font-bold text-slate-800">300 Pa – 1,400 Pa</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Motor Capacity:</span>
                <span className="font-bold text-slate-800">0.2 kW – 80 kW (Foot Mounted with Slide Rails)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Discharge Orientations:</span>
                <span className="font-bold text-brand-800">0°, 90°, 180° Top/Bottom Discharge</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. COILS & MULTI-STAGE FILTRATION (PDF Page 12 Reference) */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-[11px] font-mono tracking-widest text-[#D93636] uppercase font-bold block mb-1">
            THERMAL EXCHANGE & AIR PURIFICATION
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            High-Efficiency Coils & Airtight Multi-Stage Filtration
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Engineered for high heat transfer coefficients, low air-side pressure drops, and zero-bypass filtration efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cooling Coil Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-36 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <Image
                  src="/images/ahu/ahu-cooling-coil-copper-aluminum.jpg"
                  alt="High Heat Transfer AHU Cooling Coil with Copper Tubes and Hydrophilic Aluminum Fins"
                  title="AHU Copper Tube Cooling Coil with Hydrophilic Fins"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="relative h-36 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <Image
                  src="/images/ahu/ahu-coil-manifold-frame.jpg"
                  alt="Seamless Copper Tube AHU Coil Manifold with Galvanized and Stainless Steel Frame"
                  title="AHU Copper Tube Coil Manifold Frame"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900">
                Seamless Copper Tubes & Hydrophilic Fins
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Available in Direct Expansion (DX) or Chilled Water (CHW) configurations. Seamless copper tubes are mechanically expanded into sine-wave corrugated aluminum fins with blue hydrophilic coating, improving condensate drainage and corrosion resistance in coastal India and Vietnam.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span><strong>Slide-Out Track Design:</strong> Easy pull-out & push-in lateral coil maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span><strong>High Test Pressure:</strong> Factory helium leak-tested up to 25 kg/cm² (350 psig)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span><strong>Outdoor Compatibility:</strong> Compatible with Daikin, Trane, Carrier, LG, and Voltas condensers</span>
              </div>
            </div>
          </div>

          {/* Filtration Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="relative h-36 w-full rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
              <Image
                src="/images/ahu/ahu-multi-stage-air-filters.jpg"
                alt="Airtight AHU Filter Bank with G4 Pre-Filters and F8/F9 Fine Pocket Bag Filters"
                title="Multi-Stage AHU Air Filter Bank"
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900">
                Airtight Multi-Stage Filter Banks
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customizable filter stages engineered with quick-release clamping mechanisms and closed-cell EPDM perimeter gaskets to prevent particulate air bypass into conditioned spaces.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#063B5C] shrink-0">Stage 1 (G4):</span>
                <span>Washable synthetic pleated panel (EN779 G4 / MERV 8), 90% arrestance on &gt;10μm particles.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#063B5C] shrink-0">Stage 2 (F7/F8/F9):</span>
                <span>Microvee / synthetic pocket bag filters (EN779 F8/F9 / MERV 14–15), 90–95% efficiency on 1–3μm.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#063B5C] shrink-0">Stage 3 (Terminal):</span>
                <span>Mini-pleat or deep-pleat certified HEPA (EN1822 H13/H14), 99.997% efficiency at 0.3μm.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. ADVANCED CONFIGURATIONS: LOW-HUMIDITY DESICCANT AHU & AUTOMATION (PDF Pages 14, 15, 17, 18 Reference) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-[11px] font-mono tracking-widest text-[#D93636] uppercase font-bold block mb-1">
            SPECIALIZED INDUSTRIAL SOLUTIONS
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Low-Humidity Desiccant AHU & Smart Control Automation
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Engineered systems for deep moisture removal (down to &lt;1% RH) and smart PLC/HMI automation control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sub-item A: Low Humidity AHU */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
            <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-200 bg-white">
              <Image
                src="/images/ahu/ahu-desiccant-dehumidification-rotor.jpg"
                alt="Honeycomb Silica Gel Desiccant Rotor Wheel for Low-Humidity Cleanroom AHU"
                title="Desiccant Dehumidification Rotor Wheel for Low-Humidity AHU"
                fill
                className="object-contain p-2"
              />
              <span className="absolute top-2 left-2 bg-[#D93636] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                RH DOWN TO 1% – 35%
              </span>
            </div>

            <h4 className="font-bold text-slate-900 text-base">
              Deep Dehumidification Desiccant AHU
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard cooling coils can only lower relative humidity to ~50% without freezing. Peter Air Systems Low-Humidity AHUs integrate a rotating honeycomb silica gel desiccant wheel with thermal reactivation heating circuits.
            </p>

            <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
              <p>• <strong>Pharmaceutical Cleanrooms:</strong> Softgel capsule manufacturing & effervescent tablet compression (10% – 35% RH).</p>
              <p>• <strong>Lithium-Ion Battery Dry Rooms:</strong> Ultra-low dew point air down to -40°C to -60°C (0% – 5% RH).</p>
              <p>• <strong>Hygroscopic Chemicals:</strong> Precision food seasoning and powder packaging lines.</p>
            </div>
          </div>

          {/* Sub-item B: Smart Control Automation */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-white">
                <Image
                  src="/images/ahu/ahu-control-panel-automation.jpg"
                  alt="Industrial AHU Control Panel with Color Touchscreen HMI and PLC Automation"
                  title="AHU PLC & Touchscreen HMI Control Panel"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-white">
                <Image
                  src="/images/ahu/ahu-hvac-control-panel-bank.jpg"
                  alt="Cleanroom HVAC Control Panel Bank with VFD Starters and Electrical Protection"
                  title="Cleanroom AHU Control Panel Bank with VFD Starters"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h4 className="font-bold text-slate-900 text-base">
              HVAC & AHU Smart Control Panels
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete electrical power and automation panels built with PLCs, color HMI touchscreens, and Variable Frequency Drives (VFD), wired for both Indian (415V/50Hz) and Vietnamese (380V/50Hz) grid standards.
            </p>

            <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
              <p>• <strong>Supply Power:</strong> 1/3-Phase 220V / 380V / 415V, 50 Hz</p>
              <p>• <strong>Motor Starting:</strong> Direct-On-Line (DOL), Soft Starter (SS), or Inverter VFD</p>
              <p>• <strong>Protections:</strong> Phase loss, phase reversal, overvoltage, undervoltage, overload trip</p>
              <p>• <strong>BMS Protocols:</strong> Modbus RS485 / BACnet IP for centralized building monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. COMPLETE TECHNICAL SPECIFICATIONS MATRIX (PDF Page 13 Reference) */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#D93636] uppercase font-bold block mb-1">
              ENGINEERING DATA MATRIX
            </span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              20 Standard Model Dimensions & Performance Ratings
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Reference specifications from 2,000 m³/h (1,180 CFM) to 100,000 m³/h (58,860 CFM). Custom sizes engineered to order.
            </p>
          </div>

          {/* Unit Toggle and Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setUnitMode("m3h")}
                className={`px-2.5 py-1 rounded-md transition ${
                  unitMode === "m3h" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                m³/h (CMH)
              </button>
              <button
                type="button"
                onClick={() => setUnitMode("cfm")}
                className={`px-2.5 py-1 rounded-md transition ${
                  unitMode === "cfm" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                CFM (ft³/min)
              </button>
            </div>

            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setModelFilter("all")}
                className={`px-2 py-1 rounded-md transition ${
                  modelFilter === "all" ? "bg-[#063B5C] text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All (20)
              </button>
              <button
                type="button"
                onClick={() => setModelFilter("compact")}
                className={`px-2 py-1 rounded-md transition ${
                  modelFilter === "compact" ? "bg-[#063B5C] text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Compact
              </button>
              <button
                type="button"
                onClick={() => setModelFilter("medium")}
                className={`px-2 py-1 rounded-md transition ${
                  modelFilter === "medium" ? "bg-[#063B5C] text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setModelFilter("high")}
                className={`px-2 py-1 rounded-md transition ${
                  modelFilter === "high" ? "bg-[#063B5C] text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                High Capacity
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#063B5C] text-white font-mono uppercase text-[11px] tracking-wider">
                <th className="p-3 border-r border-[#084b75]">Model No.</th>
                <th className="p-3 border-r border-[#084b75] text-center">Dimensions (W × H × L mm)</th>
                <th className="p-3 border-r border-[#084b75] text-right">
                  Std Airflow ({unitMode === "m3h" ? "m³/h" : "CFM"})
                </th>
                <th className="p-3 border-r border-[#084b75] text-right">
                  Airflow Range ({unitMode === "m3h" ? "m³/h" : "CFM"})
                </th>
                <th className="p-3 border-r border-[#084b75] text-right">Cooling (kW)</th>
                <th className="p-3 text-right">Cooling (BTU/hr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredModels.map((row, idx) => {
                const stdAir = unitMode === "m3h" ? row.stdM3h.toLocaleString() : Math.round(row.stdM3h * 0.5886).toLocaleString();
                const minAir = unitMode === "m3h" ? row.minM3h.toLocaleString() : Math.round(row.minM3h * 0.5886).toLocaleString();
                const maxAir = unitMode === "m3h" ? row.maxM3h.toLocaleString() : Math.round(row.maxM3h * 0.5886).toLocaleString();

                return (
                  <tr
                    key={row.model}
                    className={`hover:bg-sky-50/60 transition ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    <td className="p-3 font-mono font-bold text-slate-900 border-r border-slate-100">
                      {row.model}
                    </td>
                    <td className="p-3 font-mono text-center text-slate-700 border-r border-slate-100">
                      {row.w} × {row.h} × {row.l}
                    </td>
                    <td className="p-3 font-mono font-bold text-[#063B5C] text-right border-r border-slate-100">
                      {stdAir}
                    </td>
                    <td className="p-3 font-mono text-slate-600 text-right border-r border-slate-100 text-[11px]">
                      {minAir} – {maxAir}
                    </td>
                    <td className="p-3 font-mono text-slate-800 text-right border-r border-slate-100 font-semibold">
                      {row.kw.toFixed(1)} kW
                    </td>
                    <td className="p-3 font-mono text-slate-800 text-right font-semibold">
                      {row.btu.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          * Note: Technical specifications above represent standard reference parameters. Actual dimensions, coil depth, fan static pressure (up to 1,400 Pa), and internal section layout are engineered to specific room dimensions, CFM calculations, and heat load requirements.
        </p>

        {/* Existing General Technical Parameters Table (Preserved from Peter Air Systems original) */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h4 className="text-base font-bold text-slate-900 mb-2">
            General Engineering Scope & Component Provisions
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm product-table-wrapper">
            <table className="table table-bordered w-full text-xs">
              <thead>
                <tr className="bg-slate-100">
                  <th style={{ textAlign: "center" }} colSpan={2} className="p-3 font-bold text-slate-900">
                    TECHNICAL PARAMETERS & FACTORY SPECIFICATIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-bold text-slate-800 w-1/3 bg-slate-50">MOC (Material of Construction)</td>
                  <td className="p-2.5 text-slate-700">Pre-Coated GI, Extruded Aluminium, or Stainless Steel (SS 304 / SS 316)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-800 bg-slate-50">Panel Thickness</td>
                  <td className="p-2.5 text-slate-700">PUF Insulation – 25mm, 45mm, 50mm, or 60mm (40 kg/m³ Density)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-800 bg-slate-50">Framework</td>
                  <td className="p-2.5 text-slate-700">Extruded Hollow Aluminium Pentapost Profile with Thermal Break & Non-Thermal Break options</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-800 bg-slate-50">Capacity Range</td>
                  <td className="p-2.5 text-slate-700">500 CMH to 200,000 CMH (300 CFM to 118,000 CFM)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-800 bg-slate-50">Static Pressure</td>
                  <td className="p-2.5 text-slate-700">25mm WG to 200mm WG (250 Pa to 2,000 Pa)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-800 bg-slate-50">Modular Provisions</td>
                  <td className="p-2.5 text-slate-700">
                    Mixing Chamber with manual/motorized volume control dampers, G4 Pre-Filter Section, DX or Chilled Water Cooling Coil Section, SS 304 Drain Tray, Droplet Eliminator, Hot Water Coil or Electric Heaters, Fan/Blower Section, Fine Microvee Filter Section, and Terminal HEPA Filter Section.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 8. APPLICATIONS ACROSS CRITICAL INDUSTRIES (PDF Page 19 Reference) */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-[11px] font-mono tracking-widest text-[#D93636] uppercase font-bold block mb-1">
            CERTIFIED CLEANROOM & INDUSTRIAL SECTORS
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Applications Across Demanding Production Environments
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Built for pharmaceutical WHO-GMP/EU-GMP plants, hospital surgical suites, food processing lines, and electronics factories operating across India and Vietnam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* App 1: Electronics Cleanroom */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-44 w-full bg-slate-200">
              <Image
                src="/images/ahu/cleanroom-electronics-hvac.jpg"
                alt="Electronics Cleanroom AHU Ventilation for Microchip and Component Manufacturing"
                title="Electronics & Semiconductor Cleanroom Air Handling Unit"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Electronics & Semiconductor</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ISO Class 4 – 7 cleanrooms for PCB, semiconductor, and sensor assembly across India and Vietnam industrial parks (Bac Ninh, Hai Phong, Bengaluru, Pune) requiring tight temperature and RH stability.
              </p>
            </div>
          </div>

          {/* App 2: Pharma Cleanroom */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-44 w-full bg-slate-200">
              <Image
                src="/images/ahu/cleanroom-pharmaceutical-hvac.jpg"
                alt="Pharmaceutical and Cosmetic Cleanroom AHU System with cGMP and Grade A/B Classification"
                title="Pharmaceutical cGMP Cleanroom Air Handling Unit"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Pharmaceutical & Biotechnology</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sterile formulation, injectable filling, tablet compression, and API handling compliant with WHO-GMP, EU-GMP, and Schedule M standards for pharma hubs in India and Vietnam.
              </p>
            </div>
          </div>

          {/* App 3: Hospital Operating Theatres */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-44 w-full bg-slate-200">
              <Image
                src="/images/ahu/cleanroom-hospital-operation-theatre.jpg"
                alt="Hospital Operating Theatre (OT) AHU Ventilation for Surgical Suites and ICU"
                title="Hospital Modular Operation Theatre Air Handling Unit"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Hospital Surgical Suites (Modular OT)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hygienic laminar airflow AHUs for cardiac, orthopedic, and transplant operation theatres, maintaining positive room pressure and HEPA-filtered sterile air distribution.
              </p>
            </div>
          </div>

          {/* App 4: Food Processing Cleanroom */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-44 w-full bg-slate-200">
              <Image
                src="/images/ahu/cleanroom-food-processing-hvac.jpg"
                alt="Food Processing and Dairy Cleanroom AHU Ventilation"
                title="Food & Dairy Processing Hygienic Air Handling Unit"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Food, Dairy & Beverage Processing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hygienic stainless-steel air handling that keeps airborne mold, spores, and bacteria out of dairy culture rooms, confectionery lines, and aseptic packaging zones.
              </p>
            </div>
          </div>

          {/* App 5: Softgel Capsule Room */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-44 w-full bg-slate-200">
              <Image
                src="/images/ahu/cleanroom-soft-gel-capsule.jpg"
                alt="Soft Gelatin Capsule Manufacturing Room with Low Humidity AHU"
                title="Low-Humidity AHU for Soft Gelatin Capsule Drying Rooms"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Soft Gelatin Capsule Drying</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Requires controlled low humidity (15% – 25% RH) and constant cool air temperature to cure gelatin shells without deformation or moisture retention.
              </p>
            </div>
          </div>

          {/* App 6: Effervescent Tablet Compression */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-44 w-full bg-slate-200">
              <Image
                src="/images/ahu/cleanroom-effervescent-tablet.jpg"
                alt="Effervescent Tablet Manufacturing Cleanroom with Deep Dehumidification AHU"
                title="Desiccant AHU for Effervescent & Dry Powder Suites"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Effervescent & Dry Powder Suites</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extreme moisture sensitivity during tableting and blister packaging. Controlled below 20% RH using Peter Air Systems desiccant rotor integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 9. MATERIAL OF CONSTRUCTION (MOC) */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
          Material of Construction (MOC) & Durability Standards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.materials && product.materials.map((mat: string, idx: number) => (
            <div key={idx} className="border border-slate-200 p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-brand-700" />
                <span>Specification #{idx + 1}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{decodeHtmlEntities(mat)}</p>
            </div>
          ))}
          <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-brand-700" />
              <span>Specification #5 (Drain Tray & Hardware)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              SS 304 dual-sloped condensate drain tray with continuous TIG welded seams; non-corrosive stainless steel fasteners, hinges, and nylon cam door latches.
            </p>
          </div>
          <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-brand-700" />
              <span>Specification #6 (Acoustic & Vibration Isolation)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Internal spring anti-vibration mountings (AVMs) beneath motor-blower base, flexible fire-retardant canvas duct connectors, and double hollow door gaskets.
            </p>
          </div>
        </div>
      </div>

      {/* 10. TECHNICAL FAQS FOR AHU BUYERS & CONSULTANTS (4 FAQs synced with FAQPage Schema) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-700" />
          <span>Frequently Asked Questions (FAQs)</span>
        </h3>
        <div className="space-y-3">
          {/* FAQ 1 */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              How do I select the right Air Handling Unit (AHU) capacity for a cleanroom or factory?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Start with room volume, required air changes per hour (ACH), heat load, and the pressure drop across your ducting and filters. Standard comfort HVAC usually needs 4 to 8 ACH, while pharmaceutical and electronics cleanrooms often require 15 to 60 ACH with higher static pressure for HEPA terminal filters. Share your floor plan and process heat load with our engineers, and we will size the exact airflow (CMH or CFM), coil rows, and fan motor for your plant.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              Why choose Peter Air Systems as your Air Handling Units manufacturer in India?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We build every AHU in-house at our Vasai East, Mumbai plant rather than outsourcing casing fabrication. Each unit uses thermal-break extruded aluminum pentapost frames, 40 kg/m³ PUF double-skin panels, SS 304 sloped drain pans, and factory-tested coils and filter banks. Because we manufacture cleanroom equipment alongside AHUs, our units are built to pass WHO-GMP, Schedule M, ISO 14644, and CE inspections without site modifications.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              Do you supply and export Air Handling Units from India to Vietnam?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. We regularly supply custom Air Handling Units to pharmaceutical, electronics, hospital, and food processing projects across India as well as Vietnam, including Ho Chi Minh City, Hanoi, Bac Ninh, and Binh Duong. Units for Vietnam are built for 380V/50Hz power and tropical coastal humidity, shipped in export-grade seaworthy crates (assembled or modular knocked-down), and delivered with full FAT reports, wiring diagrams, and DQ/IQ/OQ documentation.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              Why do cleanroom AHUs need thermal-break frames and direct-drive plug fans?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In humid regions like Mumbai, Chennai, Ho Chi Minh City, and Hanoi, standard aluminum frames conduct cold air from inside the casing to the outer skin, causing condensation and rust. Thermal-break polyamide profiles stop that heat transfer completely. Pairing them with direct-drive backward-curved plug fans removes V-belts that shed rubber dust, keeping downstream fine and HEPA filters cleaner for longer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
