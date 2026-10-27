import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Factory,
  CheckCircle,
  ArrowRight,
  Wind,
  Layers,
  Filter,
  Sliders,
  Sparkles,
  Cpu,
  FileCheck2,
  PhoneCall,
  Mail,
  ChevronRight,
  ExternalLink,
  Settings,
  Activity
} from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { siteConfig } from "@/data/siteConfig";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { blogPosts } from "@/data/blogs";
import { getLatestPublishedBlogs, getHeroSlides, getAllProducts } from "@/lib/db";

export default async function HomePage() {
  // Hero slides from database with static fallback
  const heroSlides = await getHeroSlides();

  // Top featured products for home with database fallback
  let allProds = products;
  try {
    const dbProds = await getAllProducts();
    if (dbProds && dbProds.length > 0) {
      allProds = dbProds as any;
    }
  } catch (e) {}

  const featuredProductSlugs = [
    "air-handling-unit-ahu",
    "static-pass-box",
    "dynamic-pass-box",
    "air-shower",
    "bio-safety-cabinets",
    "hepa-filter",
    "modular-ot",
    "mini-pleat-hepa-filter"
  ];
  const featuredProducts = allProds.filter((p) =>
    featuredProductSlugs.includes(p.slug)
  );

  // Latest 3 blog articles from database with static fallback
  let latestBlogs = blogPosts.slice(0, 3);
  try {
    const dbBlogs = await getLatestPublishedBlogs(3);
    if (dbBlogs && dbBlogs.length > 0) {
      latestBlogs = dbBlogs as any;
    }
  } catch (e) {
    // Fallback to static
  }

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SLIDER */}
      <HeroSlider initialSlides={heroSlides} />

      {/* 2. TRUST / CAPABILITY STRIP */}
      <section className="bg-brand-900 border-y border-brand-800 py-6 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-brand-800/80">
            <div className="px-3">
              <div className="flex items-center justify-center gap-2 mb-1 text-brand-300">
                <ShieldCheck className="w-5 h-5 text-brand-300" />
                <span className="font-bold text-sm tracking-wider uppercase text-white">Quality Standards</span>
              </div>
              <p className="text-xs text-slate-200">ISO 9001:2015 & CE Certified Solutions</p>
            </div>

            <div className="px-3">
              <div className="flex items-center justify-center gap-2 mb-1 text-brand-300">
                <Factory className="w-5 h-5 text-brand-300" />
                <span className="font-bold text-sm tracking-wider uppercase text-white">In-House Manufacturing</span>
              </div>
              <p className="text-xs text-slate-200">Complete Sheet Metal & Cleanroom Assembly</p>
            </div>

            <div className="px-3">
              <div className="flex items-center justify-center gap-2 mb-1 text-brand-300">
                <Award className="w-5 h-5 text-brand-300" />
                <span className="font-bold text-sm tracking-wider uppercase text-white">Regulatory Compliance</span>
              </div>
              <p className="text-xs text-slate-200">cGMP, WHO-GMP & Schedule M Adherence</p>
            </div>

            <div className="px-3">
              <div className="flex items-center justify-center gap-2 mb-1 text-brand-300">
                <Settings className="w-5 h-5 text-brand-300" />
                <span className="font-bold text-sm tracking-wider uppercase text-white">Turnkey Capability</span>
              </div>
              <p className="text-xs text-slate-200">Concept, Design, Validation & Pan-India Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT PETER AIR SYSTEMS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visuals */}
            <div className="relative">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <Image
                  src="/images/AHU.jpeg"
                  alt="Peter Air Systems Air Handling Unit Manufacturing"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-brand-950/90 backdrop-blur-md rounded-xl border border-brand-800/80 shadow-md">
                  <span className="text-xs font-semibold uppercase text-brand-300 tracking-wider">
                    Manufacturing Plant • Vasai East, Mumbai
                  </span>
                  <h4 className="text-base font-bold text-white">
                    Custom Engineered Air Handling & Contamination Control Equipment
                  </h4>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-800 uppercase bg-brand-50 border border-brand-200 px-3 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
                <span>ABOUT PETER AIR SYSTEMS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Engineered Air. Precision Cleanrooms. Manufacturing Excellence.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Peter Air Systems is a specialized manufacturer and turnkey solutions provider headquartered in Mumbai, Maharashtra. We design, engineer, and fabricate high-integrity Air Handling Units (AHUs), modular cleanrooms, surgical suites (Modular OT), cleanroom pass-through equipment, and precision air filters.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Serving demanding environments across pharmaceutical formulation, biotechnology, healthcare surgical suites, and electronics manufacturing, our systems are built with thermal-break double skin profiles, zero-leakage SS 304/SS 316 construction, and certified HEPA filtration up to 99.997% efficiency at 0.3 microns.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border-l-2 border-brand-700 pl-3">
                  <h4 className="font-bold text-slate-900 text-sm">Custom Engineering</h4>
                  <p className="text-xs text-slate-500">Tailored to exact CFM, static pressure & room dimensions.</p>
                </div>
                <div className="border-l-2 border-[#D93636] pl-3">
                  <h4 className="font-bold text-slate-900 text-sm">GMP & ISO Validation</h4>
                  <p className="text-xs text-slate-500">Comprehensive FAT, DQ, IQ, OQ documentation support.</p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about-us-peter-air-systems/"
                  className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-semibold px-6 py-3 rounded-lg text-sm transition shadow-sm"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact-peter-air-systems/"
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-brand-800 font-semibold px-4 py-3 text-sm transition"
                >
                  <span>Contact Factory</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-700 uppercase bg-white border border-slate-200 px-3 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
              <span>PRODUCT PORTFOLIO</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Engineered Product Categories
            </h2>
            <div className="w-10 h-0.5 bg-[#D93636] mx-auto rounded-full" />
            <p className="text-slate-600 text-sm sm:text-base">
              Discover our complete range of certified air handling machinery, cleanroom transfer modules, air filtration media, and turnkey modular enclosures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const primaryProd = products.find((prod) => cat.productSlugs.includes(prod.slug));
              const primaryApp = primaryProd?.applications?.[0];
              return (
                <CategoryCard
                  key={cat.id}
                  id={cat.id}
                  slug={cat.slug}
                  name={cat.name}
                  shortDescription={cat.shortDescription}
                  featuredImage={cat.featuredImage}
                  productCount={cat.productSlugs.length}
                  primaryApplication={primaryApp}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-700 uppercase bg-brand-50 border border-brand-200 px-3 py-1 rounded mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
                <span>CORE MANUFACTURING</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Featured Cleanroom & HVAC Equipment
              </h2>
            </div>
            <Link
              href="/clean-room-equipment/"
              className="mt-4 md:mt-0 text-sm font-bold text-brand-800 hover:text-brand-900 flex items-center gap-1.5 group"
            >
              <span>View All Equipment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                categoryName={p.categoryName}
                image={p.image}
                description={p.overview}
                applications={p.applications}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. ENGINEERING & MANUFACTURING CAPABILITY */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden tech-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-wider text-brand-300 uppercase bg-brand-950/90 border border-brand-700 px-3 py-1 rounded inline-block">
                IN-HOUSE MANUFACTURING & ENGINEERING
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                Precision Sheet Metal Fabrication & Certified Leak Testing
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Every Peter Air Systems unit is fabricated in our facility located in Vasai East, Palghar, Mumbai. We utilize high-precision CNC shearing, bending, and punching machinery to deliver exact tolerances for stainless steel (SS 304, SS 316) and thermal-break aluminium framing.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-800 rounded-lg text-brand-300 flex-shrink-0 mt-1">
                    <ShieldCheck className="w-5 h-5 text-brand-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Double Skin Thermal Break Construction</h4>
                    <p className="text-slate-300 text-xs sm:text-sm">Eliminates thermal bridging and condensation in high-humidity climates with high-density PUF insulation (40 kg/m³).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-800 rounded-lg text-brand-300 flex-shrink-0 mt-1">
                    <Filter className="w-5 h-5 text-brand-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">HEPA Filter Integrity & PAO Aerosol Testing</h4>
                    <p className="text-slate-300 text-xs sm:text-sm">Factory testing to ensure zero bypass leakage across filter sealing gaskets prior to site dispatch.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-800 rounded-lg text-brand-300 flex-shrink-0 mt-1">
                    <Activity className="w-5 h-5 text-brand-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Vibration & Dynamic Aerodynamic Balancing</h4>
                    <p className="text-slate-300 text-xs sm:text-sm">Blowers and fans dynamically balanced to ISO standards with spring isolators for whisper-quiet operation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                <Image
                  src="/images/Air-Showers.jpg"
                  alt="Peter Air Cleanroom Air Shower Assembly"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg border border-slate-700 mt-6">
                <Image
                  src="/images/Static-Pass-Box.jpg"
                  alt="Static Pass Box Cleanroom Fabrication"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg border border-slate-700 bg-white p-3 -mt-6">
                <Image
                  src="/images/bio-safety-cabinets.jpg"
                  alt="Bio Safety Cabinet Assembly"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                <Image
                  src="/images/MODULAR-CLEAN-ROOM-PANELS.jpg"
                  alt="Modular Cleanroom Panels Assembly"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLEANROOM SOLUTIONS ECOSYSTEM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-700 uppercase bg-brand-50 border border-brand-200 px-3 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
              <span>TURNKEY CLEANROOM EPC</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Turnkey Cleanroom Solutions: Concept to Validation
            </h2>
            <div className="w-10 h-0.5 bg-[#D93636] mx-auto rounded-full" />
            <p className="text-slate-600 text-sm sm:text-base">
              From modular wall paneling and coving to HEPA terminal housings, interlocked doors, and complete Modular Operation Theatres (OT).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { step: "01", title: "Engineering Design", desc: "CFM calculations, air flow balance & 3D layout" },
              { step: "02", title: "In-House Fabrication", desc: "Sheet metal, panels, framing & coving" },
              { step: "03", title: "HVAC Integration", desc: "AHU, ducting, chillers & dehumidifiers" },
              { step: "04", title: "On-Site Installation", desc: "Airtight modular assembly & doors" },
              { step: "05", title: "Testing & Balancing", desc: "DOP/PAO aerosol leak & particle counts" },
              { step: "06", title: "Validation Support", desc: "DQ, IQ, OQ documentation dossier" },
            ].map((s) => (
              <div key={s.step} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#063B5C]/50 transition group">
                <div className="text-brand-800 group-hover:text-[#D93636] font-bold text-2xl mb-2 transition-colors">{s.step}</div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{s.title}</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-brand-50 border border-brand-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-950">
                Planning a New Cleanroom or Modular OT Project?
              </h3>
              <p className="text-slate-700 text-sm max-w-2xl">
                Consult with our senior cleanroom application engineers. We evaluate your heat load, classification requirements (ISO 14644-1), and pressure cascade schematics.
              </p>
            </div>
            <Link
              href="/cleanroom-turnkey-solution/"
              className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-semibold px-6 py-3 rounded-lg text-sm transition shadow flex-shrink-0"
            >
              <span>Explore Cleanroom Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. INDUSTRIES WE SERVE */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-700 uppercase bg-white border border-slate-200 px-3 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
              <span>SECTORS & APPLICATIONS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Industries We Serve
            </h2>
            <div className="w-10 h-0.5 bg-[#D93636] mx-auto rounded-full" />
            <p className="text-slate-600 text-sm sm:text-base">
              Providing contamination-free environments for highly regulated manufacturing industries across India and global exports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.slice(0, 3).map((ind) => (
              <div
                key={ind.slug}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 w-full bg-slate-100">
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold">{ind.name}</h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-brand-800 text-xs font-semibold mb-2">{ind.tagline}</p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {ind.description}
                  </p>
                  <Link
                    href={`/industries/${ind.slug}/`}
                    className="text-xs font-bold text-brand-800 hover:text-brand-900 flex items-center gap-1 mt-auto pt-2 border-t border-slate-100"
                  >
                    <span>View Industry Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/industries/"
              className="inline-flex items-center gap-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-6 py-3 rounded-lg text-sm transition"
            >
              <span>View All 5 Specialized Industry Verticals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE PETER AIR SYSTEMS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-700 uppercase bg-brand-50 border border-brand-200 px-3 py-1 rounded mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
                <span>WHY PETER AIR SYSTEMS</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                Engineered for Reliability. Built to Withstand Critical Audits.
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Direct Manufacturer Pricing", desc: "No middle-man markups. Direct engineering and fabrication from our Vasai East factory." },
                  { title: "Certified Filtration Media", desc: "We utilize microglass fiber HEPA filters certified under EN 1822 with individual test certificates." },
                  { title: "Heavy Gauge Stainless Steel", desc: "Pass boxes, air showers, and biosafety cabinets fabricated in SS 304 / SS 316 with hairline grain." },
                  { title: "Thermal Break Double Skin AHU", desc: "Pentapost extrusion profiles with thermal break nylon barrier preventing external sweat." },
                  { title: "Dedicated After-Sales & AMC", desc: "Pan-India filter replacement, airflow re-balancing, and validation support." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D93636] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Compliance & Engineering Certifications
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Peter Air Systems designs and tests all equipment in accordance with key international and Indian cleanroom standards:
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D93636]" />
                  <strong>ISO 9001:2015</strong> Quality Management System Certified
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D93636]" />
                  <strong>CE Certified</strong> Conformity for Electrical & Mechanical Safety
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D93636]" />
                  <strong>ISO 14644-1</strong> Cleanroom Classification Compliant
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D93636]" />
                  <strong>WHO-GMP & USFDA</strong> Validation Protocol Compatibility
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/certifications-peter-air-systems-iso-ce-certified-solutions/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:underline"
                >
                  <span>View Our Full Certification Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LATEST BLOGS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-700 uppercase bg-white border border-slate-200 px-3 py-1 rounded mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
                <span>TECHNICAL INSIGHTS</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Latest HVAC & Cleanroom Engineering Articles
              </h2>
            </div>
            <Link
              href="/blog/"
              className="mt-4 md:mt-0 text-sm font-bold text-brand-800 hover:text-brand-900 flex items-center gap-1.5 group"
            >
              <span>Browse All 140+ Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((b) => (
              <div
                key={b.slug}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col"
              >
                <div className="relative h-48 w-full bg-slate-100">
                  <Image
                    src={b.featuredImage}
                    alt={b.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-[11px] font-medium text-brand-700 uppercase mb-2">
                    {b.categories[0] || "Cleanroom & HVAC"} • {new Date(b.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 mb-2 hover:text-brand-800">
                    <Link href={`/blog/${b.slug}/`}>{b.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-grow">
                    {b.excerpt}
                  </p>
                  <Link
                    href={`/blog/${b.slug}/`}
                    className="text-xs font-bold text-brand-800 hover:underline flex items-center gap-1 mt-auto"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ENQUIRY / RFQ CTA SECTION */}
      <section className="py-20 bg-brand-950 text-white relative overflow-hidden" id="rfq-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold tracking-wider text-brand-300 uppercase bg-brand-900/90 border border-brand-700 px-3 py-1 rounded inline-block">
                PROJECT CONSULTATION & QUOTE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                Request an Engineering Quotation & Specification Review
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Connect directly with our application engineers for custom AHU sizing, cleanroom equipment specifications, or full turnkey pricing. We provide comprehensive drawings, datasheets, and delivery schedules.
              </p>

              <div className="space-y-4 pt-4 border-t border-brand-800 text-sm">
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-brand-400" />
                  <div>
                    <span className="block text-xs text-slate-300">Direct Sales Hotline</span>
                    <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-brand-300 hover:underline transition-colors">
                      {siteConfig.contact.phonePrimary} / {siteConfig.contact.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-400" />
                  <div>
                    <span className="block text-xs text-slate-300">Direct Engineering Email</span>
                    <a href={`mailto:${siteConfig.contact.emailSales}`} className="font-bold text-white hover:text-brand-300 hover:underline transition-colors">
                      {siteConfig.contact.emailSales}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Submit Technical RFP / Quotation Request
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the project scope below. Our technical department will evaluate your criteria and send a formal proposal.
              </p>
              <EnquiryForm sourceContext="Homepage Bottom RFQ" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
