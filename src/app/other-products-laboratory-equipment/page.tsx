import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  FileCheck,
  Settings,
  HelpCircle,
  Layers,
  ChevronRight,
  FlaskConical,
  Thermometer,
  Droplets,
  Wind,
  Shield,
  Sparkles,
  Award,
  Cpu,
  Microscope
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ProductSchema, FAQSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Laboratory Equipment: Bod Incubators, Stability Chambers | Peter Air Systems",
  description:
    "Your complete Laboratory Equipment Solution: Bod Incubators, Stability Chambers, Humidity Chambers, Hot Air Ovens, Fume Hoods, and Mobile LAF Units by Peter Air Systems, Mumbai.",
  alternates: {
    canonical: "https://peterairs.com/other-products-laboratory-equipment/",
  },
  openGraph: {
    title: "Laboratory Equipment: Bod Incubators, Stability Chambers | Peter Air Systems",
    description:
      "Precision-engineered laboratory test chambers, incubators, ovens, fume hoods, and mobile LAF units for pharmaceutical, biotech, and research laboratories.",
    url: "https://peterairs.com/other-products-laboratory-equipment/",
    siteName: "Peter Air Systems",
    images: [
      {
        url: "/images/Bod-Incubator.jpg",
        width: 800,
        height: 600,
        alt: "Peter Air Systems Laboratory Equipment and Environmental Test Chambers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboratory Equipment: Bod Incubators, Stability Chambers | Peter Air Systems",
    description:
      "Precision-engineered laboratory test chambers, incubators, ovens, fume hoods, and mobile LAF units for pharmaceutical and research laboratories.",
    images: ["/images/Bod-Incubator.jpg"],
  },
};

const labProducts = [
  {
    id: "bod-incubator",
    title: "Bod Incubator",
    badge: "Microbiology & BOD Testing",
    image: "/images/Bod-Incubator.jpg",
    alt: "BOD Incubator for Biological Oxygen Demand and Microbial Culture Testing",
    shortDesc:
      "Precision-controlled BOD Incubators engineered for incubation, BOD determination, and microbial culturing under strict temperature uniformity.",
    fullDesc:
      "Welcome to our advanced Bod Incubators. These units create precise conditions for BOD testing, ensuring optimal cultivation and monitoring of various biological samples. Perfect for research, quality control, or environmental studies, our Bod Incubators deliver reliable performance tailored to your needs.",
    keySpecs: [
      { label: "Temp. Range", value: "5°C to 60°C (±0.5°C)" },
      { label: "Chamber MOC", value: "Stainless Steel SS 304" },
      { label: "Controller", value: "Microprocessor PID Dual Display" },
      { label: "Air Circulation", value: "Motorized Motor Blower Fan" },
    ],
    features: [
      "Microprocessor-based PID digital temperature controller with LED display",
      "Hermetically sealed CFC-free / HCFC-free refrigeration compressor",
      "Full-view toughened inner glass door for sample inspection without thermal disruption",
      "Forced air circulation system ensuring uniform temperature gradient throughout the chamber",
      "High-grade mineral glass wool / PUF insulation minimizing thermal transfer and energy use",
      "Audio-visual over-temperature safety thermostat cutoff protection",
    ],
    specsTable: [
      { param: "Temperature Range", spec: "5°C to 60°C" },
      { param: "Temperature Accuracy", spec: "± 0.5°C" },
      { param: "Temperature Uniformity", spec: "± 1.0°C" },
      { param: "Inner Construction", spec: "Heavy-gauge Stainless Steel SS 304 (Mirror / Hairline Finish)" },
      { param: "Outer Construction", spec: "CRCA sheet with anti-corrosive powder coating or complete SS 304" },
      { param: "Insulation", spec: "High-density polyurethane foam (PUF) / Mineral wool (75 mm)" },
      { param: "Door System", spec: "Double door: Inner toughened glass, Outer insulated solid door with magnetic gasket" },
      { param: "Refrigeration", spec: "Embraco / Tecumseh eco-friendly CFC-free compressor with air-cooled condenser" },
      { param: "Safety Devices", spec: "High-temp cutoff, compressor delay timer, MCB overload protection" },
    ],
  },
  {
    id: "stability-chamber",
    title: "Stability Chamber",
    badge: "ICH Q1A Compliance",
    image: "/images/Stability-Chamber.jpg",
    alt: "Stability Chamber for ICH Guidelines Drug Storage and Environmental Testing",
    shortDesc:
      "Advanced Stability Chambers designed to maintain consistent temperature and humidity levels in full compliance with ICH Q1A guidelines.",
    fullDesc:
      "Discover our advanced Stability Chambers designed to maintain consistent temperature and humidity levels. Ideal for storing and testing sensitive items like medicines and chemicals. With precise conditions, assess product stability and compliance with confidence. Your samples are in safe hands.",
    keySpecs: [
      { label: "Temp. Range", value: "20°C to 60°C (±0.2°C)" },
      { label: "Humidity Range", value: "40% to 95% RH (±2% RH)" },
      { label: "Compliance", value: "ICH Q1A Guidelines & 21 CFR Part 11" },
      { label: "Sensor Type", value: "Direct Capacitive RH & PT-100 Class A" },
    ],
    features: [
      "Strict compliance with ICH Q1A (R2) international stability testing guidelines",
      "Dual refrigeration circuits (working + standby) ensuring 24/7 continuous duty uninterrupted operation",
      "Capacitive thin-film polymer humidity sensor with high precision and rapid response",
      "Microprocessor PID controller with multi-color touchscreen display & Ethernet / RS485 connectivity",
      "21 CFR Part 11 compliant audit trail, user access passwords, and tamper-proof electronic data logging",
      "Stainless steel steam generator with low-water-level safety cut-off protection",
    ],
    specsTable: [
      { param: "Operating Temp. Range", spec: "20°C to 60°C (Control accuracy ± 0.2°C)" },
      { param: "Operating Humidity Range", spec: "40% to 95% RH (Control accuracy ± 2.0% RH)" },
      { param: "Standard ICH Conditions", spec: "25°C/60% RH, 30°C/65% RH, 40°C/75% RH, 30°C/75% RH" },
      { param: "Interior Chamber MOC", spec: "Heavy-duty SS 316 / SS 304 with silicone gasket seals" },
      { param: "Humidification Method", spec: "Stainless steel boiler tank with high-grade immersion heaters" },
      { param: "Dehumidification", spec: "Refrigeration-based dew point cooling coil" },
      { param: "Data Management", spec: "Data logger with USB flash export, SMS alerts, SCADA interface" },
      { param: "Safety Alarms", spec: "Audio/visual temp & RH deviation alarms, door open alarm, low water alarm" },
    ],
  },
  {
    id: "humidity-chamber",
    title: "Humidity Chamber",
    badge: "Accelerated Stress Testing",
    image: "/images/Humidity-Chamber.jpg",
    alt: "Precision Humidity Chamber for Environmental Aging and Quality Control Studies",
    shortDesc:
      "High-precision Humidity Chambers crafted to replicate diverse relative humidity and thermal conditions for component stress and aging assessments.",
    fullDesc:
      "Experience our cutting-edge Humidity Chambers, crafted to replicate various humidity conditions for diverse testing needs. Whether for electronic components or pharmaceuticals, our chambers create the ideal environment for aging tests, stability studies, and quality control assessments. Trust in consistent and accurate results with our reliable and easy-to-use Humidity Chambers.",
    keySpecs: [
      { label: "Humidity Range", value: "20% to 98% RH (±2% RH)" },
      { label: "Temp. Range", value: "10°C to 80°C (±0.5°C)" },
      { label: "MOC Interior", value: "SS 304 Mirror Finish" },
      { label: "Viewing Window", value: "Multi-Pane Heated Glass" },
    ],
    features: [
      "Wide operational humidity range from 20% to 98% RH with tight stability controls",
      "Ultra-fine aerosol steam injection / ultrasonic moisture generation for rapid equilibrium",
      "Multi-pane vacuum-sealed heated viewing window preventing condensation fogging during testing",
      "Heavy-gauge stainless steel chamber construction resistant to persistent moisture and corrosion",
      "Programmable multi-step cyclic ramp-and-soak testing profiles for thermal-humidity cycling",
      "Adjustable stainless steel perforated shelves for optimal air and vapor penetration",
    ],
    specsTable: [
      { param: "Humidity Generation Range", spec: "20% to 98% RH at specified temperatures" },
      { param: "Temperature Range", spec: "10°C to 80°C" },
      { param: "Uniformity", spec: "± 2.0% RH, ± 0.5°C across all shelf levels" },
      { param: "Sensor Technology", spec: "Imported capacitive electronic RH transducer" },
      { param: "Observation Window", spec: "Hermetically sealed multi-pane heated glass with wiper" },
      { param: "Internal Airflow", spec: "Laminar-assisted horizontal or vertical air circulation" },
      { param: "Water Reservoir", spec: "SS 304 demineralized water tank with automatic float fill valve" },
      { param: "Protection", spec: "Boiler dry-run protection, independent thermal cutout" },
    ],
  },
  {
    id: "hot-air-oven",
    title: "Hot Air Oven",
    badge: "Dry Heat Sterilization",
    image: "/images/Hot-Air-Oven.jpg",
    alt: "Industrial Hot Air Oven for Dry Heat Sterilization and Glassware Drying",
    shortDesc:
      "Advanced industrial and laboratory Hot Air Ovens with precise temperature control and uniform heat distribution for sterilization, drying, and annealing.",
    fullDesc:
      "Discover our state-of-the-art Hot Air Ovens, meticulously crafted for a variety of drying, sterilization, and heating tasks. Engineered with precise temperature control and even heat distribution, our Hot Air Ovens are indispensable for laboratories, research facilities, and industrial processes alike.\n\nWhether you're removing moisture, conducting thermal tests, or sterilizing equipment, our Hot Air Ovens consistently deliver dependable performance to meet your critical requirements. Moreover, they feature user-friendly digital controllers for precise temperature settings, ensuring optimal treatment of your samples.\n\nBuilt with robust construction and quality insulation, our ovens minimize heat loss, enhance energy efficiency, and maintain uniform temperature throughout the chamber. Safety is paramount, and our ovens include over-temperature protection and alarms to alert users of any deviations, safeguarding your experiments and processes.",
    keySpecs: [
      { label: "Temp. Range", value: "50°C to 250°C / 300°C" },
      { label: "Accuracy", value: "± 1.0°C at 150°C" },
      { label: "Heating Element", value: "Nichrome Wire / Incoloy Tubular" },
      { label: "Air Circulation", value: "Heavy-Duty Motorized Blower" },
    ],
    features: [
      "Operating temperature up to 250°C / 300°C suitable for dry heat depyrogenation and sterilization",
      "High-grade Nichrome 80/20 or Incoloy tubular heating elements positioned for optimal airflow contact",
      "Double-walled construction with thick high-density mineral wool insulation preventing external skin heating",
      "Motorized forced-convection fan circulation eliminating hot-spots and dead zones",
      "Digital PID temperature controller with built-in digital process timer (0 to 999 mins)",
      "Independent mechanical safety thermostat cut-off preventing runaway heating conditions",
    ],
    specsTable: [
      { param: "Operating Temperature", spec: "Ambient +5°C to 250°C (Optional up to 300°C)" },
      { param: "Temperature Accuracy", spec: "± 1.0°C" },
      { param: "Thermal Uniformity", spec: "± 2.5°C across the chamber" },
      { param: "Internal Chamber", spec: "Heavy-duty SS 304 with rib reinforcement for thermal expansion" },
      { param: "External Cabinet", spec: "Mild steel sheet with electrostatic epoxy polyester powder coat" },
      { param: "Door Gasket", spec: "High-temperature aerospace-grade silicone sponge rubber gasket" },
      { param: "Air Ventilation", spec: "Top-mounted adjustable exhaust air damper port" },
      { param: "Safety Standard", spec: "DIN 12880 Class 2 / Class 3.1 over-temperature compliance" },
    ],
  },
  {
    id: "fume-hood",
    title: "Fume Hood",
    badge: "Chemical Fume Extraction",
    image: "/images/Fume-Hood.jpg",
    alt: "Laboratory Fume Hood for Chemical Fumes and Hazardous Material Extraction",
    shortDesc:
      "High-performance aerodynamic Fume Hoods designed to safely capture, contain, and exhaust hazardous chemical vapors and toxic gases.",
    fullDesc:
      "Explore our cutting-edge Fume Hoods, meticulously designed to ensure safety when working with hazardous materials and chemicals. Our Fume Hoods boast excellent ventilation and high-efficiency filters, meticulously crafted to capture and eliminate harmful fumes and vapors, safeguarding both users and the environment. They are indispensable in laboratories handling volatile substances.\n\nDesigned to meet rigorous safety standards, our Fume Hoods provide a secure working environment for researchers and technicians alike. Equipped with powerful fans and advanced filtration systems, they ensure continuous airflow, effectively trapping airborne contaminants. The ergonomic design features adjustable sash heights for optimal user comfort and visibility.\n\nIn addition to safety, our Fume Hoods prioritize efficiency. They incorporate low energy consumption motors and durable materials for long-lasting performance. Maintenance is streamlined with easy-access panels, facilitating quick filter replacements and cleaning.",
    keySpecs: [
      { label: "Sash Type", value: "Counterbalanced Toughened Glass" },
      { label: "Face Velocity", value: "80 to 100 FPM (0.4 to 0.5 m/s)" },
      { label: "Liner Material", value: "PP / FRP / SS 316 / Phenolic" },
      { label: "Exhaust Blower", value: "Chemical-Resistant Centrifugal" },
    ],
    features: [
      "Aerodynamic bypass airfoil design minimizing turbulence and eddy currents at the sash opening",
      "Counterbalanced vertical sliding sash with 6 mm thick toughened safety glass and stainless steel cable",
      "Chemical-resistant internal lining options (Polypropylene, solid phenolic resin, FRP, or SS 316)",
      "High-suction dynamically balanced centrifugal chemical blower in PP or FRP construction",
      "Integrated utility service valves for laboratory gases, compressed air, nitrogen, and deionized water",
      "Dished ceramic / epoxy resin chemical worktop with raised anti-spill containment marine edge",
    ],
    specsTable: [
      { param: "Face Velocity", spec: "Constant 80 - 100 FPM (0.4 - 0.5 m/s) at 18-inch working sash height" },
      { param: "Standard Sizes", spec: "3 ft (900 mm), 4 ft (1200 mm), 5 ft (1500 mm), 6 ft (1800 mm) width" },
      { param: "Worktop Surface", spec: "Chemical-proof Black Granite / Solid Epoxy Resin / SS 316 with sink" },
      { param: "Sash Movement", spec: "Smooth counterbalanced vertical sliding with anti-drop safety brake" },
      { param: "Lighting", spec: "Vapor-sealed cool LED illumination (> 800 Lux at working plane)" },
      { param: "Exhaust Ducting", spec: "PP/FRP anti-corrosive duct collar with volume control damper" },
      { param: "Base Cabinet", spec: "Storage cabinet for acid and solvent storage with ventilation connection" },
      { param: "Compliance", spec: "ASHRAE 110-2016 containment testing and EN 14175 standards" },
    ],
  },
  {
    id: "mobile-laf-unit",
    title: "Mobile LAF Unit",
    badge: "Portable ISO Class 5 Cleanliness",
    image: "/images/Mobile-LAF-Unit.jpg",
    alt: "Mobile LAF Unit for Mobile Sterile Laminar Air Flow Protection in Cleanrooms",
    shortDesc:
      "Versatile self-contained Mobile Laminar Air Flow Units providing portable ISO Class 5 sterile workspaces for aseptic processing and transfers.",
    fullDesc:
      "Explore the flexibility and convenience of our Mobile LAF (Laminar Air Flow) Units. These self-contained units are perfect for creating sterile, particle-free environments in cleanrooms, laboratories, and medical facilities alike. Designed to deliver aseptic workspaces for critical applications, our Mobile LAF Units ensure safety and contamination control wherever they are deployed.\n\nThe compact design and mobility of our Mobile LAF Units offer unmatched versatility. Easily movable and adaptable, they can be positioned to fit various workflows and spatial requirements. This flexibility makes them ideal for temporary setups or for providing additional sterile areas during peak usage times.\n\nEquipped with high-efficiency particulate air (HEPA) filters, our Mobile LAF Units guarantee a clean air supply, devoid of contaminants. Constructed from durable materials, they withstand frequent movement and usage, ensuring long-term reliability. Adjustable airflow settings allow users to customize the environment for pharmaceutical preparations, surgical procedures, or sensitive research experiments.\n\nEase of use is paramount with our Mobile LAF Units. Intuitive controls and clear display panels make operation straightforward, even for first-time users. Low noise levels contribute to a quiet working environment, crucial in medical and research settings where concentration is key.",
    keySpecs: [
      { label: "Cleanliness", value: "ISO Class 5 (US Fed 209E Class 100)" },
      { label: "HEPA Filter", value: "H14 99.997% @ 0.3 Micron" },
      { label: "Air Velocity", value: "0.45 ± 0.05 m/s (90 ± 20 FPM)" },
      { label: "Mobility", value: "Heavy-Duty PU Castor Wheels w/ Brakes" },
    ],
    features: [
      "Guaranteed ISO Class 5 (Class 100) aseptic working zone with continuous unidirectional laminar airflow",
      "High-efficiency H14 Mini-Pleat HEPA filter with 99.997% retention efficiency at 0.3 micron",
      "Pre-filter G4 stage (10 micron) to protect and prolong HEPA filter operating lifespan",
      "Robust heavy-duty polyurethane castor wheels with foot-operated dual swivel locks for effortless relocation",
      "Constructed entirely from premium Stainless Steel SS 304 with grit 240/320 hairline finish",
      "Variable speed solid-state motor blower delivering quiet operation (< 65 dB) and vibration isolation",
    ],
    specsTable: [
      { param: "Air Cleanliness", spec: "ISO Class 5 (ISO 14644-1) / Class 100 (Fed Std 209E)" },
      { param: "Final Filtration", spec: "Minipleat HEPA Filter (H14 Grade, 99.997% @ 0.3 µm)" },
      { param: "Primary Filtration", spec: "Washable synthetic media Pre-filter (G4 Grade, 90% @ 10 µm)" },
      { param: "Flow Velocity", spec: "0.45 m/s ± 20% (90 FPM ± 20 FPM) uniform laminar downflow" },
      { param: "Cabinet MOC", spec: "Stainless Steel SS 304 (SS 316 optional on request)" },
      { param: "Side Curtains", spec: "Antistatic flexible PVC strip curtains (200 mm width x 2 mm thickness)" },
      { param: "Differential Pressure", spec: "Minihelic differential pressure gauge for HEPA monitoring" },
      { param: "Power Supply", spec: "230V AC, single phase, 50 Hz with on-board battery backup option" },
    ],
  },
];

const faqs = [
  {
    q: "What is laboratory equipment used for?",
    a: "Laboratory equipment is used for scientific research, testing, analysis, and controlled experiments across pharmaceutical, chemical, biotechnology, and industrial environments. It provides precise control over temperature, humidity, airflow, and sterilization to maintain high reproducibility and experimental integrity.",
  },
  {
    q: "What is a BOD Incubator used for?",
    a: "A BOD (Biological Oxygen Demand) Incubator is used to measure biological oxygen demand in wastewater and environmental testing, and to provide closely controlled 20°C incubation conditions for microbial growth, cell culturing, and pharmaceutical stability studies.",
  },
  {
    q: "Where are Stability Chambers used?",
    a: "Stability Chambers are used in pharmaceutical formulations, bulk drugs (API), cosmetics, and materials research to test product stability and shelf life under controlled temperature and humidity conditions in strict adherence to ICH Q1A (R2) global guidelines.",
  },
  {
    q: "What is the function of a Fume Hood?",
    a: "A Fume Hood is a ventilated laboratory enclosure designed to safely capture, contain, and exhaust hazardous chemical fumes, vapors, and toxic gases away from the operator and workspace, safeguarding personnel and preventing contamination of the wider room.",
  },
  {
    q: "What makes Peter Air Systems laboratory equipment compliant for pharma cleanrooms?",
    a: "All Peter Air Systems laboratory units are manufactured from heavy-gauge SS 304 / SS 316 stainless steel with cGMP sanitary designs, continuous welded seams, silicone gaskets, and calibration-ready digital micro-controllers. Equipment can be supplied with complete DQ, IQ, OQ, and PQ validation documentation and 21 CFR Part 11 compliant data management.",
  },
];

const industries = [
  {
    name: "Pharmaceutical Formulations & API",
    desc: "Long-term and accelerated drug stability testing, BOD incubator assays, and raw material moisture drying.",
  },
  {
    name: "Biotechnology & Life Sciences",
    desc: "Sterile culture incubation, microbial testing, and mobile aseptic ISO Class 5 zone maintenance.",
  },
  {
    name: "Hospitals, IVF & Pathology",
    desc: "Sterile sample transfers, cell culturing, histology specimen drying, and hazardous reagent handling.",
  },
  {
    name: "Chemical & Petrochemical Testing",
    desc: "Safe extraction of volatile reagents, corrosive solvent handling, and controlled thermal aging.",
  },
  {
    name: "Food, Dairy & Beverage QA",
    desc: "Shelf-life estimation, microbial limit testing, and dry moisture estimation of food products.",
  },
  {
    name: "Electronics & Semiconductor Labs",
    desc: "Humidity-stress cycling, thermal stability evaluation of PCBs, and particle-free mobile workstations.",
  },
];

export default function OtherProductsLaboratoryEquipmentPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Schemas */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://peterairs.com/" },
          { name: "Cleanroom Equipment", url: "https://peterairs.com/clean-room-equipment/" },
          { name: "Other Products / Laboratory Equipment", url: "https://peterairs.com/other-products-laboratory-equipment/" },
        ]}
      />
      <FAQSchema
        faqs={faqs.map((f) => ({
          question: f.q,
          answer: f.a,
        }))}
      />
      <ProductSchema
        name="Peter Air Systems Laboratory Equipment & Test Chambers"
        description="Comprehensive line of precision laboratory equipment including Bod Incubators, Stability Chambers, Humidity Chambers, Hot Air Ovens, Fume Hoods, and Mobile LAF Units."
        image="https://peterairs.com/images/Bod-Incubator.jpg"
        category="Cleanroom & Laboratory Equipment"
        url="https://peterairs.com/other-products-laboratory-equipment/"
      />

      {/* Hero Banner */}
      <PageBanner
        title="Other Products / Laboratory Equipment"
        subtitle="Precision Scientific & Environmental Test Equipment Engineered for Pharma, Biotech & Cleanrooms"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cleanroom Equipment", href: "/clean-room-equipment/" },
          { label: "Other Products / Laboratory Equipment" },
        ]}
        bgImage="/images/ahu_banner.png"
      />

      {/* Top Value Badges Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
              <Award className="w-4 h-4 text-brand-700 shrink-0" />
              <span>ISO 9001:2015 & CE Certified</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0" />
              <span>ICH Q1A & cGMP Compliant</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
              <Sparkles className="w-4 h-4 text-brand-700 shrink-0" />
              <span>SS 304 / SS 316 Construction</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
              <FileCheck className="w-4 h-4 text-brand-700 shrink-0" />
              <span>DQ, IQ, OQ, PQ Validation Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Category Anchor Bar */}
      <section className="bg-slate-100 border-b border-slate-200 sticky top-[65px] z-30 hidden sm:block backdrop-blur-md bg-slate-100/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-2 scrollbar-none text-xs font-medium">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] shrink-0 mr-2 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-brand-700" />
              Jump To:
            </span>
            {labProducts.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-brand-900 hover:border-brand-400 hover:bg-brand-50 transition shadow-2xs"
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Overview Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-bold uppercase tracking-wider">
                <FlaskConical className="w-3.5 h-3.5 text-brand-700" />
                <span>Engineered by Peter Air Systems • Vasai East, Mumbai</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                High-Precision Laboratory Equipment & Environmental Test Chambers
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">
                Discover our top-quality laboratory equipment designed to streamline your scientific research. From
                precision-controlled <strong>Bod Incubators</strong> to reliable <strong>Stability Chambers</strong> for
                consistent temperature and humidity, we offer a comprehensive range to meet diverse research and
                industrial testing needs.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Explore our <strong>Humidity Chambers</strong>, <strong>Hot Air Ovens</strong>,{" "}
                <strong>Fume Hoods</strong>, and <strong>Mobile LAF Units</strong> for various applications. Trust our
                dependable solutions to elevate your laboratory work and achieve accurate, reproducible results every
                time. Manufactured in-house in our advanced manufacturing facility in Vasai East, Mumbai, with global
                shipping and complete turnkey support.
              </p>
            </div>

            {/* Quick Contact Box */}
            <div className="lg:col-span-4 bg-gradient-to-br from-brand-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-brand-800">
              <h3 className="font-heading font-bold text-lg mb-2 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-brand-300" />
                Custom Lab Engineering
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Need customized dimensions, 21 CFR Part 11 software, or explosive-proof certification? Talk directly
                with our cleanroom engineering team.
              </p>
              <div className="space-y-2 text-xs border-t border-brand-800/80 pt-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                  <a href="tel:+918484836337" className="hover:text-white transition">
                    +91 8484 836 337 / +91 7350 336 337
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                  <a href="mailto:sales@peterairsystem.com" className="hover:text-white transition">
                    sales@peterairsystem.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Vasai East, Palghar, Mumbai – 401208</span>
                </div>
              </div>
              <a
                href="#enquiry-section"
                className="block text-center w-full py-2.5 px-4 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition duration-150 shadow-md"
              >
                Request Quotation & Specs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Product Equipment Showcase Grid */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider block mb-2">
              CATALOGUE OF LABORATORY SOLUTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Explore Our Six Core Laboratory Systems
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Each unit is precision-engineered with surgical-grade stainless steel, digital micro-controllers, and
              comprehensive safety interlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full bg-white border-b border-slate-100 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute top-3 left-3 bg-brand-900/90 text-white text-[10px] font-mono tracking-wider px-2 py-0.5 rounded shadow-xs z-10">
                    {p.badge}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-900 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-3">
                    {p.shortDesc}
                  </p>

                  {/* Quick specs pill grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-[11px]">
                    {p.keySpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="text-slate-400 block text-[10px] uppercase font-mono">{spec.label}</span>
                        <span className="text-slate-800 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-3 flex items-center justify-between border-t border-slate-100">
                    <a
                      href={`#${p.id}`}
                      className="text-xs font-bold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1 group/link"
                    >
                      <span>Full Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>
                    <a
                      href="#enquiry-section"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-900 hover:bg-brand-800 hover:text-white transition-colors"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Technical Sections for Each Product */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider block mb-2">
              ENGINEERING SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              In-Depth Technical Documentation & Features
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Detailed construction, control system, airflow characteristics, and compliance standards for every
              laboratory model.
            </p>
          </div>

          {labProducts.map((product, pIdx) => (
            <div
              key={product.id}
              id={product.id}
              className="pt-8 scroll-mt-28 border-t border-slate-200 first:border-0 first:pt-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Product Image Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-4 sticky top-32">
                    <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-white flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-contain p-2"
                      />
                      <span className="absolute top-3 left-3 bg-brand-900 text-white text-[10px] font-mono tracking-wider px-2.5 py-1 rounded shadow-xs z-10">
                        {product.badge}
                      </span>
                    </div>
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] block font-mono">STANDARDS</span>
                        <span className="font-semibold text-slate-800">ISO 9001:2015 | CE</span>
                      </div>
                      <a
                        href="#enquiry-section"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-800 hover:bg-brand-900 text-white font-semibold rounded-lg text-xs transition"
                      >
                        <span>Get Quote</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Detailed Overview, Features & Specs */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-700 uppercase tracking-widest">
                      PRODUCT OVERVIEW
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {product.fullDesc}
                  </p>

                  {/* Engineering Features */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-700" />
                      Key Engineering Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-700 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 leading-normal">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Matrix Table */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-brand-700" />
                      Technical Specifications & Parameters
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-4 w-1/3">Parameter</th>
                            <th className="py-2.5 px-4 w-2/3">Engineering Specification</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/80 bg-white">
                          {product.specsTable.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-2.5 px-4 font-medium text-slate-900 bg-slate-50/50">
                                {row.param}
                              </td>
                              <td className="py-2.5 px-4 text-slate-600">{row.spec}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target Applications Grid */}
      <section className="py-14 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider block mb-2">
              CROSS-INDUSTRY DEPLOYMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Cleanroom & Laboratory Applications
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Our laboratory equipment is engineered to fulfill the stringent audit requirements of US FDA, EU-GMP,
              WHO-TRS, and ISO 14644-1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, iIdx) => (
              <div
                key={iIdx}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-200 text-brand-800 flex items-center justify-center mb-3">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{ind.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Laboratory Equipment FAQs
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Clear answers to the most common queries regarding our test chambers, ovens, and laminar units.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 hover:bg-slate-50 transition"
              >
                <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2.5 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote & Consultation Section */}
      <section id="enquiry-section" className="py-16 bg-slate-100 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Contact Card */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider block mb-1">
                  DIRECT CONSULTATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Request Technical Quotation & Sizing Support
                </h2>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  Our application engineers in Mumbai can tailor chamber capacities, shelf configurations, airflow
                  velocities, and sensor calibrations to your exact cleanroom or laboratory layout.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
                  Peter Air Systems Headquarters & Factory
                </h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                    <span>
                      Gala No. 10, Ground Floor, Building No. 2, Sagar Compound, Pelhar, Vasai East, Palghar,
                      Maharashtra – 401208, India.
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-700 shrink-0" />
                    <div className="space-x-2">
                      <a href="tel:+918484836337" className="font-semibold text-slate-900 hover:text-brand-800">
                        +91 8484 836 337
                      </a>
                      <span>/</span>
                      <a href="tel:+917350336337" className="font-semibold text-slate-900 hover:text-brand-800">
                        +91 7350 336 337
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-700 shrink-0" />
                    <a
                      href="mailto:sales@peterairsystem.com"
                      className="font-semibold text-slate-900 hover:text-brand-800"
                    >
                      sales@peterairsystem.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-700 shrink-0" />
                    <span>Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Validation notice */}
              <div className="bg-brand-50/70 border border-brand-200 rounded-xl p-4 text-xs text-brand-950 flex items-start gap-3">
                <FileCheck className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Documentation Dossier:</strong> Every laboratory unit comes with user operating manuals,
                  circuit schematics, sensor factory calibration certificates, and DQ/IQ/OQ validation protocols upon
                  request.
                </span>
              </div>
            </div>

            {/* Right: Embedded Enquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Quick Enquiry Form
              </h3>
              <p className="text-slate-500 text-xs mb-6">
                Fill in your laboratory requirements below. Our technical sales team will revert within 24 business
                hours with drawings and pricing.
              </p>
              <EnquiryForm
                initialProduct="Other Products / Laboratory Equipment"
                sourceContext="Other Products / Laboratory Equipment Dedicated Page"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
