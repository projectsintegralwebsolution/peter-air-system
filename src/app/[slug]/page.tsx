import React from "react";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
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
  Navigation,
  ExternalLink
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { ProductCard } from "@/components/ProductCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ProductSchema, FAQSchema, BreadcrumbSchema, ItemListSchema } from "@/components/SchemaMarkup";
import { siteConfig } from "@/data/siteConfig";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { services } from "@/data/services";
import { getProductBySlug, getProductCategoryBySlug, getAllProducts, getAllServices } from "@/lib/db";
import { decodeHtmlEntities } from "@/lib/textUtils";

// All static slugs
export async function generateStaticParams() {
  const productSlugs = products
    .filter((p) => p.slug !== "other-products-laboratory-equipment")
    .map((p) => ({ slug: p.slug }));
  const categorySlugs = ["air-filters", "hvac-products", "clean-room-equipment"].map((s) => ({ slug: s }));
  const staticPageSlugs = [
    "about-us-peter-air-systems",
    "services",
    "certifications-peter-air-systems-iso-ce-certified-solutions",
    "contact-peter-air-systems",
    "disclaimer",
    "peter-terms-of-service",
    "privacy-policy",
  ].map((s) => ({ slug: s }));

  return [...productSlugs, ...categorySlugs, ...staticPageSlugs];
}

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  // Check product from DB with static fallback
  let product: any = null;
  try {
    product = await getProductBySlug(slug);
  } catch (e) {}
  if (!product) product = products.find((p) => p.slug === slug);

  if (product) {
    const pageTitle = product.seoTitle ? { absolute: product.seoTitle } : product.title;
    return {
      title: pageTitle,
      description: product.metaDescription || product.overview,
      alternates: {
        canonical: product.canonical || `https://peterairs.com/${slug}/`,
      },
      openGraph: {
        title: product.seoTitle || product.title,
        description: product.metaDescription || product.overview,
        url: product.canonical || `https://peterairs.com/${slug}/`,
        images: [{ url: product.image }],
      },
    };
  }

  // Check category from DB with static fallback
  let cat: any = null;
  try {
    cat = await getProductCategoryBySlug(slug);
  } catch (e) {}
  if (!cat) cat = categories.find((c) => c.slug === slug);

  if (cat) {
    const catTitle = `${cat.name} Manufacturer & Solutions`;
    const catUrl = `https://peterairs.com/${slug}/`;
    return {
      title: catTitle,
      description: cat.shortDescription,
      alternates: {
        canonical: catUrl,
      },
      openGraph: {
        title: catTitle,
        description: cat.shortDescription,
        url: catUrl,
        images: [{ url: cat.featuredImage || cat.bannerImage || "/images/ahu_banner.png" }],
      },
    };
  }

  // Static pages
  const staticMeta: Record<string, { title: string; description: string }> = {
    "about-us-peter-air-systems": {
      title: "About Peter Air Systems: Cleanroom & HVAC Equipment Manufacturer",
      description: "Learn about Peter Air Systems, our state-of-the-art engineering plant in Vasai East, Mumbai, and our ISO 9001:2015 cleanroom solutions.",
    },
    "services": {
      title: "Cleanroom & HVAC Engineering Services | Peter Air Systems",
      description: "Turnkey Cleanroom EPC, Pharma HVAC Validation, AHU energy audits, and airflow balancing services by Peter Air Systems.",
    },
    "certifications-peter-air-systems-iso-ce-certified-solutions": {
      title: "Certifications: ISO 9001:2015 & CE Certified Solutions | Peter Air",
      description: "Review our quality certifications, CE compliance, ISO 9001:2015 manufacturing standards and cleanroom validation protocols.",
    },
    "contact-peter-air-systems": {
      title: "Contact Peter Air Systems - Manufacturing Clean Room Equipment",
      description: "Contact Peter Air Systems Mumbai factory for inquiries on Clean Room Equipment, AHUs, and HVAC products. Call +91 8484 836 337.",
    },
    "disclaimer": {
      title: "Disclaimer - Peter Air Systems",
      description: "Legal disclaimer and product specification notice for Peter Air Systems.",
    },
    "peter-terms-of-service": {
      title: "Terms of Service Cleanroom & HVAC | Peter Air Systems",
      description: "Review the Terms of Service for Peter Air Systems engineering and equipment supply.",
    },
    "privacy-policy": {
      title: "Privacy Policy | Peter Air Systems",
      description: "Peter Air Systems privacy policy regarding client technical data and communication.",
    },
  };

  if (staticMeta[slug]) {
    return {
      title: { absolute: staticMeta[slug].title },
      description: staticMeta[slug].description,
      alternates: {
        canonical: `https://peterairs.com/${slug}/`,
      },
    };
  }

  return {
    title: "Peter Air Systems",
  };
}

export default async function GenericPage({ params }: PageProps) {
  const { slug } = params;

  // 1. Check if product page (from database with static fallback)
  let product: any = null;
  try {
    product = await getProductBySlug(slug);
  } catch (e) {}
  if (!product) product = products.find((p) => p.slug === slug);

  if (product) {
    // Related products in same category or adjacent
    const related = products
      .filter((p) => p.slug !== product.slug && (p.categorySlug === product.categorySlug || p.categoryName === product.categoryName))
      .slice(0, 4);

    return (
      <div className="w-full bg-white">
        <ProductSchema
          name={product.title}
          description={product.metaDescription}
          image={product.image}
          category={product.categoryName}
          url={product.canonical}
        />
        {product.faqs && product.faqs.length > 0 && <FAQSchema faqs={product.faqs} />}
        <BreadcrumbSchema
          items={[
            { name: "Home", url: siteConfig.url },
            { name: product.categoryName, url: `${siteConfig.url}/${product.categorySlug}/` },
            { name: product.title, url: product.canonical },
          ]}
        />

        {/* 1. Page Banner */}
        <PageBanner
          title={product.h1 || product.title}
          subtitle={`Engineered by Peter Air Systems • ${product.categoryName}`}
          breadcrumbs={[
            { label: product.categoryName, href: `/${product.categorySlug}/` },
            { label: product.title },
          ]}
          bgImage={product.bannerImage || "/images/ahu_banner.png"}
        />

        {/* 2. Main Product Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Product Imagery, Overview, Tables, Specs */}
            <div className="lg:col-span-8 space-y-12">
              {/* Product Hero Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="relative h-72 sm:h-80 w-full md:w-80 bg-white rounded-xl border border-slate-200 p-4 flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={
                      product.slug === "hepa-terminal-box"
                        ? "HEPA Terminal Box for Cleanroom HVAC Systems"
                        : product.slug === "supply-return-air-diffuser"
                        ? "Supply Return Air Diffuser for HVAC Ventilation Systems"
                        : product.slug === "return-air-riser"
                        ? "Return Air Riser for HVAC Ventilation Systems"
                        : product.slug === "bio-safety-cabinets"
                        ? "Bio Safety Cabinet for Laboratory and Cleanroom Applications"
                        : product.slug === "enhance-air-quality-with-pre-filters"
                        ? "HVAC Pre Filters for Primary Air Filtration Systems"
                        : product.slug === "modular-clean-room-doors"
                        ? "Modular Clean Room Doors for Pharmaceutical and Cleanroom Facilities"
                        : product.title
                    }
                    fill
                    priority
                    className="object-contain p-2"
                  />
                  <span className="absolute top-3 left-3 bg-[#063B5C] text-white text-[10px] font-mono tracking-wider px-2 py-0.5 rounded shadow-xs z-10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
                    <span>ISO & CE VERIFIED</span>
                  </span>
                </div>

                <div className="space-y-4 flex-grow">
                  <span className="text-xs font-mono font-bold text-brand-700 uppercase tracking-widest">
                    TECHNICAL OVERVIEW
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {product.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {product.overview}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="bg-white border border-slate-300 text-slate-700 text-xs px-2.5 py-1 rounded font-medium">
                      Custom Sizing Available
                    </span>
                    <span className="bg-white border border-slate-300 text-slate-700 text-xs px-2.5 py-1 rounded font-medium">
                      SS 304 / SS 316
                    </span>
                    <span className="bg-white border border-slate-300 text-slate-700 text-xs px-2.5 py-1 rounded font-medium">
                      GMP & Schedule M Compliant
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Key Engineering Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/80 p-3 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-[#D93636] flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700">{decodeHtmlEntities(feat)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications Tables (Preserved Exact Content) */}
              {product.tables && product.tables.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Technical Specifications & Dimension Matrix
                  </h3>
                  <p className="text-xs text-slate-500">
                    Standard configurations and technical parameters. Custom fabrication engineered upon request.
                  </p>
                  <div className="space-y-6 overflow-x-auto">
                    {product.tables.map((tableHtml, idx) => (
                      <div
                        key={idx}
                        className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm product-table-wrapper"
                        dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(tableHtml) }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Construction & Materials */}
              {product.materials && product.materials.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Material of Construction (MOC)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.materials.map((mat: string, idx: number) => (
                      <div key={idx} className="border border-slate-200 p-4 rounded-xl bg-slate-50">
                        <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
                          <ShieldCheck className="w-4 h-4 text-brand-700" />
                          <span>Specification #{idx + 1}</span>
                        </div>
                        <p className="text-xs text-slate-600">{decodeHtmlEntities(mat)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications & Industries */}
              {product.applications && product.applications.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Applications & Cleanroom Sectors
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.applications.map((app: string, idx: number) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs font-medium text-slate-700">
                        • {decodeHtmlEntities(app)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Section */}
              {product.faqs && product.faqs.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-brand-700" />
                    <span>Frequently Asked Technical Questions</span>
                  </h3>
                  <div className="space-y-3">
                    {product.faqs.map((faq, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                        <h4 className="font-bold text-slate-900 text-sm mb-2">
                          {decodeHtmlEntities(faq.question)}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {decodeHtmlEntities(faq.answer)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Product RFQ Form & Direct Contact */}
            <div className="lg:col-span-4 space-y-8">
              {/* Product Enquiry Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-lg sticky top-28">
                <div className="border-b border-slate-200 pb-4 mb-4">
                  <span className="text-[11px] font-mono tracking-widest text-brand-700 uppercase font-bold">
                    DIRECT FACTORY QUOTATION
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Enquire About This Product
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Receive customized technical datasheet, drawings, and formal quotation for <strong>{product.title}</strong>.
                  </p>
                </div>

                <EnquiryForm
                  initialProduct={product.title}
                  sourceContext={`Product Page: ${product.title}`}
                />

                <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-700" />
                    <span>Instant Call: </span>
                    <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`} className="font-bold text-brand-900 hover:underline">
                      {siteConfig.contact.phonePrimary}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-brand-700" />
                    <span>Sales: </span>
                    <a href={`mailto:${siteConfig.contact.emailSales}`} className="font-bold text-brand-900 hover:underline">
                      {siteConfig.contact.emailSales}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {related.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  Related Cleanroom & HVAC Equipment
                </h3>
                <Link href={`/${product.categorySlug}/`} className="text-xs font-bold text-brand-800 hover:underline flex items-center gap-1">
                  <span>View All in {product.categoryName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((rp) => (
                  <ProductCard
                    key={rp.slug}
                    slug={rp.slug}
                    title={rp.title}
                    categoryName={rp.categoryName}
                    image={rp.image}
                    description={rp.overview}
                    applications={rp.applications}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. Check if category page (from database with static fallback)
  let cat: any = null;
  try {
    cat = await getProductCategoryBySlug(slug);
  } catch (e) {}
  if (!cat) cat = categories.find((c) => c.slug === slug);

  if (cat) {
    let allProds = products;
    try {
      const dbProds = await getAllProducts();
      if (dbProds && dbProds.length > 0) allProds = dbProds as any;
    } catch (e) {}

    const catProducts = allProds.filter((p) => cat.productSlugs?.includes(p.slug) || p.categorySlug === cat.slug);

    return (
      <div className="w-full bg-white">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: siteConfig.url },
            { name: "Products", url: `${siteConfig.url}/clean-room-equipment/` },
            { name: cat.name, url: `https://peterairs.com/${slug}/` },
          ]}
        />
        <ItemListSchema
          name={cat.name}
          description={cat.shortDescription}
          items={catProducts.map((p) => ({
            name: p.title,
            url: p.canonical || `${siteConfig.url}/${p.slug}/`,
            image: p.image,
          }))}
        />
        <PageBanner
          title={cat.name}
          subtitle={cat.shortDescription}
          breadcrumbs={[{ label: "Products" }, { label: cat.name }]}
          bgImage={cat.bannerImage}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Available Models & Equipment
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl">
              All units are fabricated with premium-grade stainless steel or thermal break aluminium profiles and rigorously tested prior to site delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {catProducts.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                categoryName={cat.name}
                image={p.image}
                description={p.overview}
                applications={p.applications}
              />
            ))}
          </div>

          <div className="mt-20 bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Need Custom Sizing or Technical Drawings for {cat.name}?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Our application engineering department provides customized CAD layouts, CFM calculations, and specification sheets.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact-peter-air-systems/"
                  className="inline-flex items-center gap-2 bg-brand-800 text-white font-semibold px-6 py-3 rounded-lg text-xs tracking-wider uppercase hover:bg-brand-900 transition"
                >
                  <span>Request Engineering Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. About Us Page
  if (slug === "about-us-peter-air-systems") {
    return (
      <div className="w-full bg-white">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: siteConfig.url },
            { name: "About Us", url: `${siteConfig.url}/about-us-peter-air-systems/` },
          ]}
        />
        <PageBanner
          title="About Peter Air Systems"
          subtitle="Engineering Excellence in Air Handling Units, Cleanroom Equipment, and Modular Solutions."
          breadcrumbs={[{ label: "About Us" }]}
          bgImage="/images/ahu_banner.png"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider bg-brand-50 border border-brand-200 px-3 py-1 rounded inline-block">
                COMPANY BACKGROUND
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                High-Integrity Cleanroom & HVAC Manufacturing in Mumbai
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Peter Air Systems is a specialized engineering and manufacturing enterprise operating out of Agarwal Industrial Estate, Vasai East, Palghar, Mumbai, Maharashtra. We provide comprehensive cleanroom solutions, specialized HVAC air distribution units, and sterile medical environment systems.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our mission is to empower pharmaceutical manufacturers, life-sciences research institutions, hospitals, and semiconductor facilities with contamination-free environments that meet stringent regulatory compliance like WHO-GMP, Schedule M, and USFDA standards.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border-l-2 border-brand-700 pl-3">
                  <h4 className="font-bold text-slate-900 text-sm">In-House Manufacturing</h4>
                  <p className="text-xs text-slate-500">CNC punching, shearing, folding, and cleanroom assembly in Mumbai.</p>
                </div>
                <div className="border-l-2 border-brand-700 pl-3">
                  <h4 className="font-bold text-slate-900 text-sm">Quality Assurance</h4>
                  <p className="text-xs text-slate-500">ISO 9001:2015 and CE Certified quality management procedures.</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="/images/AHU.jpeg"
                alt="Peter Air Systems Facility"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Plant & Capabilities */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Manufacturing Infrastructure & Technical Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-base mb-2">Sheet Metal Shop</h4>
                <p>Heavy gauge SS 304, SS 316, and Pre-coated GI fabrication with CNC press brakes ensuring airtight seams and smooth cleanroom radius edges.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-base mb-2">Testing & Validation Bay</h4>
                <p>Dedicated testing bays equipped with aerosol photometers, anemometers, and differential pressure calibrators for full pre-dispatch FAT testing.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-base mb-2">Cleanroom Assembly</h4>
                <p>Controlled assembly area for cleanroom furniture, biosafety cabinets, and laminar flow work stations with HEPA filter seal integrity inspection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Services Page
  if (slug === "services") {
    let serviceList = services;
    try {
      const dbServices = await getAllServices();
      if (dbServices && dbServices.length > 0) serviceList = dbServices as any;
    } catch (e) {}

    return (
      <div className="w-full bg-white">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: siteConfig.url },
            { name: "Solutions & Services", url: `${siteConfig.url}/services/` },
          ]}
        />
        <PageBanner
          title="Solutions & Engineering Services"
          subtitle="Turnkey Cleanroom EPC, HVAC Validation, Energy Audits, and Airflow Balancing."
          breadcrumbs={[{ label: "Services" }]}
          bgImage="/images/7-1.png"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-slate-900">
              Comprehensive Engineering & Validation Services
            </h2>
            <p className="text-slate-600 text-sm">
              We support cleanroom operators from concept design through validation and lifecycle maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceList.map((s) => (
              <div key={s.slug} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">{s.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.description}</p>
                <div className="pt-2">
                  <h4 className="text-xs font-mono font-bold text-brand-800 uppercase mb-2">Key Deliverables:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {s.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Request a Technical Consultation</h3>
              <p className="text-slate-200 text-sm">Discuss your facility layout or validation audit with our engineers.</p>
            </div>
            <Link
              href="/contact-peter-air-systems/"
              className="bg-white text-brand-950 font-bold px-6 py-3 rounded-lg text-sm hover:bg-slate-100 transition shadow"
            >
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 5. Certifications Page
  if (slug === "certifications-peter-air-systems-iso-ce-certified-solutions") {
    return (
      <div className="w-full bg-white">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: siteConfig.url },
            { name: "Certifications", url: `${siteConfig.url}/certifications-peter-air-systems-iso-ce-certified-solutions/` },
          ]}
        />
        <PageBanner
          title="Certifications & Quality Standards"
          subtitle="ISO 9001:2015 & CE Certified Quality Management in Cleanroom & HVAC Engineering."
          breadcrumbs={[{ label: "Certifications" }]}
          bgImage="/images/Hepa-Filter.jpg"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50 space-y-4">
              <div className="inline-block p-3 bg-brand-800 text-white rounded-xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">ISO 9001:2015 Certification</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Peter Air Systems adheres strictly to ISO 9001:2015 Quality Management Systems. Our processes covering design, procurement of raw materials (SS304/SS316), sheet metal fabrication, blower assembly, electrical wiring, and final testing follow documented quality protocols.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50 space-y-4">
              <div className="inline-block p-3 bg-brand-800 text-white rounded-xl">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">CE Certified Conformity</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our cleanroom containment equipment, including Air Showers, Bio Safety Cabinets, Dynamic Pass Boxes, and Air Handling Units, complies with European CE safety, electrical, and mechanical directives for international export and industrial deployment.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Testing & Factory Acceptance (FAT) Standards</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Prior to site delivery, every equipment model undergoes rigorous verification:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-brand-900 mb-1">DOP/PAO Filter Leak Test</strong>
                Aerosol challenge to confirm 99.997% retention at 0.3μm without gasket bypass.
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-brand-900 mb-1">Air Velocity & Uniformity</strong>
                Digital thermal anemometer profiling ensuring 0.45 m/s ± 20% laminar flow.
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-brand-900 mb-1">Static Pressure & Leakage</strong>
                Casing air leakage testing under Eurovent / EN 1886 specifications.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. Contact Us Page
  if (slug === "contact-peter-air-systems") {
    return (
      <div className="w-full bg-white">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: siteConfig.url },
            { name: "Contact", url: `${siteConfig.url}/contact-peter-air-systems/` },
          ]}
        />
        <PageBanner
          title="Contact Peter Air Systems"
          subtitle="Get in touch with our factory and sales engineering team in Vasai East, Mumbai."
          breadcrumbs={[{ label: "Contact Us" }]}
          bgImage="/images/ahu_banner.png"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider bg-brand-50 border border-brand-200 px-3 py-1 rounded inline-block mb-3">
                  FACTORY & CORPORATE OFFICE
                </span>
                <h2 className="text-3xl font-bold text-slate-900">
                  Connect With Our Engineering Team
                </h2>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  Have inquiries regarding custom Air Handling Units, Cleanroom Equipment, or Turnkey Modular Cleanrooms? Drop us a line or call our sales desk directly.
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <MapPin className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <strong className="block text-slate-900 font-bold mb-1">Works & Office Address:</strong>
                    <p className="text-slate-600 text-xs leading-relaxed mb-2.5">
                      {siteConfig.contact.address}
                    </p>
                    <a
                      href="https://www.google.com/maps/search/Unit+No.+-+01,+02,+03+and+06,+Agarwal+Industrial+Estate,+Golani,+Vasai+East,+Palghar+%E2%80%93+401208,+Mumbai,+Maharashtra,+India./@19.3956624,72.8448979,13.47z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <Phone className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold mb-1">Direct Phone Lines:</strong>
                    <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`} className="block text-brand-800 font-semibold hover:underline">
                      {siteConfig.contact.phonePrimary}
                    </a>
                    <a href={`tel:${siteConfig.contact.phoneSecondary.replace(/\s+/g, '')}`} className="block text-slate-600 hover:underline">
                      {siteConfig.contact.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <Mail className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold mb-1">Official Emails:</strong>
                    <a href={`mailto:${siteConfig.contact.emailSales}`} className="block text-brand-800 font-semibold hover:underline">
                      {siteConfig.contact.emailSales}
                    </a>
                    <a href={`mailto:${siteConfig.contact.emailDirect}`} className="block text-slate-600 hover:underline">
                      {siteConfig.contact.emailDirect}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <Clock className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold mb-1">Business Hours:</strong>
                    <span className="text-slate-600 text-xs">{siteConfig.contact.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Send a Message / RFQ
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Please provide your requirement details and our engineering team will get back to you promptly.
              </p>
              <EnquiryForm sourceContext="Contact Page Form" />
            </div>
          </div>

          {/* Interactive Google Map Section */}
          <div className="mt-12 lg:mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider bg-brand-50 border border-brand-200 px-3 py-1 rounded inline-block mb-2">
                  FACTORY LOCATION &amp; NAVIGATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Find Peter Air Systems on Google Maps
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Unit No. 01, 02, 03 &amp; 06, Agarwal Industrial Estate, Golani, Vasai East, Palghar – 401208, Mumbai, Maharashtra, India.
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/Unit+No.+-+01,+02,+03+and+06,+Agarwal+Industrial+Estate,+Golani,+Vasai+East,+Palghar+%E2%80%93+401208,+Mumbai,+Maharashtra,+India./@19.3956624,72.8448979,13.47z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#063B5C] hover:bg-[#084b75] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all shrink-0 self-start sm:self-auto"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Map Frame Container */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 h-[360px] sm:h-[420px] lg:h-[480px]">
              <iframe
                title="Google Map showing Peter Air Systems factory location at Agarwal Industrial Estate, Vasai East, Mumbai"
                src="https://maps.google.com/maps?q=19.3956624,72.8448979&z=16&hl=en&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Map showing Peter Air Systems factory location"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. Legal pages (disclaimer, terms, privacy)
  if (slug === "disclaimer" || slug === "peter-terms-of-service" || slug === "privacy-policy") {
    const titles: Record<string, string> = {
      "disclaimer": "Disclaimer",
      "peter-terms-of-service": "Terms of Service",
      "privacy-policy": "Privacy Policy"
    };

    return (
      <div className="w-full bg-white">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: siteConfig.url },
            { name: titles[slug] || "Legal", url: `${siteConfig.url}/${slug}/` },
          ]}
        />
        <PageBanner
          title={titles[slug]}
          subtitle="Legal notices and terms for Peter Air Systems."
          breadcrumbs={[{ label: titles[slug] }]}
          bgImage="/images/ahu_banner.png"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose prose-slate">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{titles[slug]}</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Welcome to Peter Air Systems. The information provided on this website is for general industrial informational and technical engineering reference purposes. While we endeavor to keep specifications up-to-date, equipment designs, materials, and features may be refined based on client requirements, continuous research, and customized engineering criteria.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            All proprietary product names, technical drawings, CAD layouts, and performance data remain the intellectual property of Peter Air Systems. Unauthorized reproduction or commercial distribution without written authorization is prohibited.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            For specific project warranties, FAT criteria, delivery milestones, and formal quotes, please contact our authorized engineering sales department at <a href={`mailto:${siteConfig.contact.emailSales}`} className="text-brand-800 font-semibold">{siteConfig.contact.emailSales}</a>.
          </p>
        </div>
      </div>
    );
  }

  // 8. Backward-compatibility redirect for legacy root blog URLs (/[slug]/ -> /blog/[slug]/)
  const isBlog = blogPosts.some((b) => b.slug === slug);
  if (isBlog) {
    permanentRedirect(`/blog/${slug}/`);
  }

  notFound();
}
