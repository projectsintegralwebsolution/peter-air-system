import { prisma } from "./prisma";
import { hashPassword } from "./auth";
import { blogPosts } from "@/data/blogs";
import { products as baseProducts } from "@/data/products";
import { categories as baseCategories } from "@/data/categories";
import { industries as baseIndustries } from "@/data/industries";
import { services as baseServices } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import fs from "fs";
import path from "path";

let isInitialized = false;

const defaultSlides = [
  {
    slideNumber: "01",
    badge: "CUSTOM HVAC & AIR HANDLING SYSTEMS",
    heading: "Precision-Engineered Air Handling Units & HVAC Systems",
    highlightWord: "Air Handling Units",
    supportingText:
      "Custom double-skin thermal-break Air Handling Units (AHU), Air Washers, and Industrial Dehumidifiers engineered for pharmaceutical GMP, healthcare, and critical industrial environments.",
    primaryBtnText: "Explore AHU Systems",
    primaryBtnLink: "/air-handling-unit-ahu/",
    secondaryBtnText: "Request Technical Quote",
    secondaryBtnAction: "modal",
    secondaryBtnLink: "",
    image: "/images/hero-banner-1.png",
    technicalSpecs: JSON.stringify([
      "Thermal Break Profiles",
      "PUF Insulated 40 kg/m³",
      "Eurovent / ISO Standards",
      "Direct Drive / VFD Ready",
    ]),
    order: 1,
    isActive: true,
  },
  {
    slideNumber: "02",
    badge: "SS 304 / SS 316 CONTAMINATION CONTROL",
    heading: "Advanced Cleanroom Equipment & Laminar Workstations",
    highlightWord: "Cleanroom Equipment",
    supportingText:
      "Static & Dynamic Pass Boxes, High-Velocity Air Showers, Bio Safety Cabinets, Dispensing Booths, and Laminar Workstations built with zero-leakage HEPA containment.",
    primaryBtnText: "View Cleanroom Equipment",
    primaryBtnLink: "/clean-room-equipment/",
    secondaryBtnText: "Talk to Our Engineers",
    secondaryBtnAction: "link",
    secondaryBtnLink: "/contact-peter-air-systems/",
    image: "/images/hero-banner-2.png",
    technicalSpecs: JSON.stringify([
      "SS 304 / SS 316 Construction",
      "99.997% HEPA Filtration",
      "Electromagnetic Interlocks",
      "UV Sterilization Cycle",
    ]),
    order: 2,
    isActive: true,
  },
  {
    slideNumber: "03",
    badge: "PRECISION AIR DISTRIBUTION & FILTRATION",
    heading: "Certified Air Filtration & Distribution Networks",
    highlightWord: "Filtration Networks",
    supportingText:
      "Heavy-gauge Galvanized and Stainless Steel HVAC ducting, HEPA Terminal Boxes, Aerodynamic Diffusers, Return Air Risers, and Microvee/HEPA filtration media.",
    primaryBtnText: "Explore Air Distribution",
    primaryBtnLink: "/hvac-products/",
    secondaryBtnText: "Download Catalog",
    secondaryBtnAction: "modal",
    secondaryBtnLink: "",
    image: "/images/hero-banner-3.png",
    technicalSpecs: JSON.stringify([
      "H13 & H14 Certified HEPA",
      "Aerodynamic Airfoil Dampers",
      "Airtight Flanged Joints",
      "Low Noise & Low Pressure Drop",
    ]),
    order: 3,
    isActive: true,
  },
  {
    slideNumber: "04",
    badge: "TURNKEY CLEANROOM EPC & STERILIZATION",
    heading: "Turnkey Cleanroom Solutions & Contamination Control",
    highlightWord: "Turnkey Cleanrooms",
    supportingText:
      "Concept-to-commissioning modular cleanrooms, pass boxes, air showers, and sterilizer chambers. Complete with airtight GMP doors and laminar airflow distribution.",
    primaryBtnText: "Explore Turnkey Solutions",
    primaryBtnLink: "/cleanroom-turnkey-solution/",
    secondaryBtnText: "Get Project Estimation",
    secondaryBtnAction: "modal",
    secondaryBtnLink: "",
    image: "/images/hero-banner-4.png",
    technicalSpecs: JSON.stringify([
      "ISO Class 1 to Class 8",
      "Flush Modular Paneling",
      "Airtight Hermetic Doors",
      "Complete DQ/IQ/OQ Dossier",
    ]),
    order: 4,
    isActive: true,
  },
];

/**
 * Initializes the database on first access:
 * 1. Seeds admin user if none exists.
 * 2. Seeds base blogs.
 * 3. Seeds hero slides.
 * 4. Seeds product categories.
 * 5. Seeds products.
 * 6. Seeds industries.
 * 7. Seeds services.
 * 8. Seeds site content.
 * 9. Seeds existing inquiries.
 */
export async function initDatabase(): Promise<void> {
  if (isInitialized) return;

  try {
    // 1. Admin User
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      const email = process.env.ADMIN_DEFAULT_EMAIL || "admin@peterairs.com";
      const rawPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin";
      const passwordHash = await hashPassword(rawPassword);

      await prisma.user.create({
        data: {
          email,
          name: "Peter Air Administrator",
          passwordHash,
          role: "admin",
        },
      });
      console.log(`[DB Init] Created initial admin user: ${email}`);
    }

    // 2. Base Blogs
    const blogCount = await prisma.blog.count();
    if (blogCount === 0 && Array.isArray(blogPosts) && blogPosts.length > 0) {
      console.log(`[DB Init] Seeding ${blogPosts.length} base blog posts...`);
      const categorySet = new Set<string>();

      for (const p of blogPosts) {
        const cat = p.categories?.[0] || "Cleanroom Components";
        categorySet.add(cat);

        await prisma.blog.create({
          data: {
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt || p.title,
            content: p.content || `<p>${p.excerpt || p.title}</p>`,
            featuredImage: p.featuredImage || "/images/AHU.jpeg",
            imageAlt: p.title,
            author: "Peter Air Systems Engineering Team",
            category: cat,
            tags: (p.categories || []).join(", "),
            isDraft: false,
            publishedAt: new Date(p.date || Date.now()),
            createdAt: new Date(p.date || Date.now()),
            seoTitle: `${p.title} | Peter Air Systems`,
            metaDescription: (p.excerpt || p.title).slice(0, 160),
            canonicalUrl: `https://peterairs.com/blog/${p.slug}/`,
            isBase: true,
          },
        });
      }

      for (const catName of categorySet) {
        const catSlug = catName.toLowerCase().replace(/[^\w-]/g, "-").replace(/-+/g, "-");
        await prisma.category.upsert({
          where: { slug: catSlug },
          update: {},
          create: {
            name: catName,
            slug: catSlug,
            description: `Industrial cleanroom and HVAC technical articles in ${catName}`,
          },
        });
      }
    }

    // 3. Hero Slides
    const heroCount = await prisma.heroSlide.count();
    if (heroCount === 0) {
      console.log("[DB Init] Seeding hero slides...");
      for (const slide of defaultSlides) {
        await prisma.heroSlide.create({ data: slide });
      }
    }

    // 4. Product Categories
    const pCatCount = await prisma.productCategory.count();
    if (pCatCount === 0 && Array.isArray(baseCategories)) {
      console.log(`[DB Init] Seeding ${baseCategories.length} product categories...`);
      let order = 1;
      for (const c of baseCategories) {
        await prisma.productCategory.create({
          data: {
            slug: c.slug,
            name: c.name,
            shortDescription: c.shortDescription || "",
            bannerImage: c.bannerImage || "/images/ahu_banner.png",
            featuredImage: c.featuredImage || "/images/AHU.jpeg",
            productSlugs: JSON.stringify(c.productSlugs || []),
            displayOrder: order++,
            isActive: true,
          },
        });
      }
    }

    // 5. Products
    const prodCount = await prisma.product.count();
    if (prodCount === 0 && Array.isArray(baseProducts)) {
      console.log(`[DB Init] Seeding ${baseProducts.length} products...`);
      let order = 1;
      for (const p of baseProducts) {
        await prisma.product.create({
          data: {
            slug: p.slug,
            title: p.title,
            categorySlug: p.categorySlug || "hvac-products",
            categoryName: p.categoryName || "Air Handling & HVAC Systems",
            seoTitle: p.seoTitle || `${p.title} | Peter Air Systems`,
            metaDescription: p.metaDescription || p.overview?.slice(0, 160) || "",
            canonical: p.canonical || `https://peterairs.com/${p.slug}/`,
            h1: p.h1 || p.title,
            image: p.image || "/images/AHU.jpeg",
            bannerImage: p.bannerImage || "/images/ahu_banner.png",
            overview: p.overview || "",
            fullContent: p.fullContent || "",
            faq: JSON.stringify((p as any).faqs || (p as any).faq || []),
            displayOrder: order++,
            isPublished: true,
            isFeatured: order <= 8,
          },
        });
      }
    }

    // 6. Industries
    const indCount = await prisma.industry.count();
    if (indCount === 0 && Array.isArray(baseIndustries)) {
      console.log(`[DB Init] Seeding ${baseIndustries.length} industries...`);
      let order = 1;
      for (const ind of baseIndustries) {
        await prisma.industry.create({
          data: {
            slug: ind.slug,
            name: ind.name,
            tagline: ind.tagline || "",
            image: ind.image || "/images/Pharmaceuticals.jpg",
            description: ind.description || "",
            challenges: JSON.stringify(ind.challenges || []),
            solutions: JSON.stringify(ind.solutions || []),
            products: JSON.stringify(ind.products || []),
            displayOrder: order++,
            isActive: true,
          },
        });
      }
    }

    // 7. Services
    const srvCount = await prisma.service.count();
    if (srvCount === 0 && Array.isArray(baseServices)) {
      console.log(`[DB Init] Seeding ${baseServices.length} services...`);
      let order = 1;
      for (const srv of baseServices) {
        await prisma.service.create({
          data: {
            slug: srv.slug,
            name: srv.name,
            description: srv.description || "",
            icon: srv.icon || "ShieldCheck",
            deliverables: JSON.stringify(srv.deliverables || []),
            displayOrder: order++,
            isActive: true,
          },
        });
      }
    }

    // 8. Site Content & Global Settings
    const contentCount = await prisma.siteContent.count();
    if (contentCount === 0) {
      console.log("[DB Init] Seeding default site content...");
      const defaultContent = [
        {
          key: "company.name",
          section: "company",
          label: "Company Legal Name",
          value: siteConfig.name || "Peter Air Systems",
        },
        {
          key: "company.tagline",
          section: "company",
          label: "Company Tagline",
          value: siteConfig.tagline || "Air Handling Units & Cleanroom Solutions",
        },
        {
          key: "company.description",
          section: "company",
          label: "Company Overview",
          value: siteConfig.description || "",
        },
        {
          key: "contact.phone.primary",
          section: "contact",
          label: "Primary Phone",
          value: siteConfig.contact.phonePrimary || "+91 8484 836 337",
        },
        {
          key: "contact.phone.secondary",
          section: "contact",
          label: "Secondary Phone",
          value: siteConfig.contact.phoneSecondary || "+91 7350 336 337",
        },
        {
          key: "contact.whatsapp",
          section: "contact",
          label: "WhatsApp Number",
          value: siteConfig.contact.whatsapp || "+91 8484 836 337",
        },
        {
          key: "contact.email.sales",
          section: "contact",
          label: "Sales Email",
          value: siteConfig.contact.emailSales || "sales@peterairs.com",
        },
        {
          key: "contact.email.direct",
          section: "contact",
          label: "Direct Email",
          value: siteConfig.contact.emailDirect || "sanjay@peterairs.com",
        },
        {
          key: "contact.address",
          section: "contact",
          label: "Registered Plant Address",
          value: siteConfig.contact.address || "",
        },
        {
          key: "contact.workingHours",
          section: "contact",
          label: "Working Hours",
          value: siteConfig.contact.workingHours || "Monday - Saturday: 9:00 AM - 6:30 PM (IST)",
        },
        {
          key: "home.hero.title",
          section: "homepage",
          label: "Hero Slider Main Title",
          value: "Custom Engineered Air Handling Units & Modular Cleanrooms",
        },
        {
          key: "home.about.heading",
          section: "homepage",
          label: "About Section Heading",
          value: "Engineered Air. Precision Cleanrooms. Manufacturing Excellence.",
        },
        {
          key: "home.about.paragraph1",
          section: "homepage",
          label: "About Section Paragraph 1",
          value:
            "Peter Air Systems is a specialized manufacturer and turnkey solutions provider headquartered in Mumbai, Maharashtra. We design, engineer, and fabricate high-integrity Air Handling Units (AHUs), modular cleanrooms, surgical suites (Modular OT), cleanroom pass-through equipment, and precision air filters.",
        },
      ];

      for (const item of defaultContent) {
        await prisma.siteContent.create({ data: item });
      }
    }

    // 9. Existing Enquiries (from data/enquiries.json if exists)
    const enqCount = await prisma.enquiry.count();
    if (enqCount === 0) {
      const enqFile = path.join(process.cwd(), "data", "enquiries.json");
      if (fs.existsSync(enqFile)) {
        try {
          const list = JSON.parse(fs.readFileSync(enqFile, "utf8"));
          if (Array.isArray(list) && list.length > 0) {
            console.log(`[DB Init] Migrating ${list.length} existing inquiries into database...`);
            for (const item of list) {
              await prisma.enquiry.create({
                data: {
                  name: item.name || "Anonymous",
                  companyName: item.companyName || "",
                  email: item.email || "",
                  phone: item.phone || "",
                  productOrService: item.productOrService || "General Inquiry",
                  requirement: item.requirement || "",
                  quantity: item.quantity || "1 Unit / Project",
                  city: item.city || "",
                  message: item.message || "",
                  status: (item.status || "new").toLowerCase(),
                  createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
                },
              });
            }
          }
        } catch (e) {}
      }
    }

    isInitialized = true;
  } catch (err) {
    console.error("[DB Init Error]", err);
  }
}

// ----------------- Hero Slides Helpers -----------------

export async function getHeroSlides() {
  try {
    await initDatabase();
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    if (slides && slides.length > 0) {
      return slides.map((s, idx) => ({
        id: idx + 1,
        slideNumber: s.slideNumber || `0${idx + 1}`,
        badge: s.badge,
        heading: s.heading,
        highlightWord: s.highlightWord,
        supportingText: s.supportingText,
        primaryBtnText: s.primaryBtnText,
        primaryBtnLink: s.primaryBtnLink,
        secondaryBtnText: s.secondaryBtnText,
        secondaryBtnAction: (s.secondaryBtnAction || "modal") as "modal" | "link",
        secondaryBtnLink: s.secondaryBtnLink || undefined,
        image: s.image,
        technicalSpecs: (() => {
          try {
            return JSON.parse(s.technicalSpecs);
          } catch {
            return [];
          }
        })(),
      }));
    }
  } catch (e) {
    console.error("[DB getHeroSlides Error]", e);
  }

  // Fallback
  return defaultSlides.map((s, idx) => ({
    ...s,
    id: idx + 1,
    technicalSpecs: JSON.parse(s.technicalSpecs),
    secondaryBtnAction: s.secondaryBtnAction as "modal" | "link",
  }));
}

// ----------------- Product Helpers -----------------

export interface GetProductsOptions {
  categorySlug?: string;
  featuredOnly?: boolean;
  includeUnpublished?: boolean;
  limit?: number;
}

export async function getAllProducts(options: GetProductsOptions = {}) {
  try {
    await initDatabase();
    const { categorySlug, featuredOnly, includeUnpublished = false, limit } = options;

    const whereClause: any = {};
    if (!includeUnpublished) whereClause.isPublished = true;
    if (categorySlug) whereClause.categorySlug = categorySlug;
    if (featuredOnly) whereClause.isFeatured = true;

    const prods = await prisma.product.findMany({
      where: whereClause,
      orderBy: { displayOrder: "asc" },
      take: limit,
    });

    if (prods && prods.length > 0) {
      return prods.map((p) => {
        const base = baseProducts.find((bp) => bp.slug === p.slug) || ({} as any);
        return {
          ...base,
          id: p.id,
          slug: p.slug,
          title: p.title,
          categorySlug: p.categorySlug,
          categoryName: p.categoryName,
          seoTitle: p.seoTitle || base.seoTitle || `${p.title} | Peter Air Systems`,
          metaDescription: p.metaDescription || base.metaDescription || p.overview?.slice(0, 160) || "",
          canonical: p.canonical || base.canonical || `https://peterairs.com/${p.slug}/`,
          h1: p.h1 || base.h1 || p.title,
          image: p.image || base.image,
          bannerImage: p.bannerImage || base.bannerImage,
          overview: p.overview || base.overview,
          fullContent: p.fullContent || base.fullContent,
          features: base.features || [],
          applications: base.applications || [],
          materials: base.materials || [],
          tables: base.tables || [],
          faqs: base.faqs || [],
          isPublished: p.isPublished,
          isFeatured: p.isFeatured,
        };
      });
    }
  } catch (e) {
    console.error("[DB getAllProducts Error]", e);
  }

  // Fallback to static
  let list = baseProducts as any[];
  if (options.categorySlug) {
    list = list.filter((p) => p.categorySlug === options.categorySlug);
  }
  if (options.featuredOnly) {
    list = list.slice(0, 8);
  }
  return list;
}

export async function getProductBySlug(slug: string) {
  try {
    await initDatabase();
    const clean = slug.trim().toLowerCase();
    const prod = await prisma.product.findUnique({
      where: { slug: clean },
    });

    const base = baseProducts.find((p) => p.slug === clean) || ({} as any);

    if (prod) {
      // Increment view count asynchronously
      prisma.product
        .update({
          where: { id: prod.id },
          data: { views: { increment: 1 } },
        })
        .catch(() => {});

      return {
        ...base,
        id: prod.id,
        slug: prod.slug,
        title: prod.title,
        categorySlug: prod.categorySlug,
        categoryName: prod.categoryName,
        seoTitle: prod.seoTitle || base.seoTitle || `${prod.title} | Peter Air Systems`,
        metaDescription: prod.metaDescription || base.metaDescription || prod.overview?.slice(0, 160) || "",
        canonical: prod.canonical || base.canonical || `https://peterairs.com/${prod.slug}/`,
        h1: prod.h1 || base.h1 || prod.title,
        image: prod.image || base.image,
        bannerImage: prod.bannerImage || base.bannerImage,
        overview: prod.overview || base.overview,
        fullContent: prod.fullContent || base.fullContent,
        features: (() => {
          try {
            const parsed = JSON.parse(prod.features);
            return parsed && parsed.length > 0 ? parsed : base.features || [];
          } catch {
            return base.features || [];
          }
        })(),
        applications: (() => {
          try {
            const parsed = JSON.parse(prod.applications);
            return parsed && parsed.length > 0 ? parsed : base.applications || [];
          } catch {
            return base.applications || [];
          }
        })(),
        materials: base.materials || [],
        tables: base.tables || [],
        faqs: (() => {
          try {
            const parsed = JSON.parse(prod.faq);
            return parsed && parsed.length > 0 ? parsed : base.faqs || [];
          } catch {
            return base.faqs || [];
          }
        })(),
        isPublished: prod.isPublished,
        isFeatured: prod.isFeatured,
      };
    }
  } catch (e) {
    console.error("[DB getProductBySlug Error]", e);
  }

  // Fallback to static
  return baseProducts.find((p) => p.slug === slug) || null;
}

// ----------------- Category Helpers -----------------

export async function getProductCategories() {
  try {
    await initDatabase();
    const cats = await prisma.productCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    if (cats && cats.length > 0) {
      return cats.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        shortDescription: c.shortDescription,
        bannerImage: c.bannerImage,
        featuredImage: c.featuredImage,
        productSlugs: (() => {
          try {
            return JSON.parse(c.productSlugs);
          } catch {
            return [];
          }
        })(),
      }));
    }
  } catch (e) {
    console.error("[DB getProductCategories Error]", e);
  }

  return baseCategories;
}

export async function getProductCategoryBySlug(slug: string) {
  try {
    await initDatabase();
    const clean = slug.trim().toLowerCase();
    const cat = await prisma.productCategory.findUnique({
      where: { slug: clean },
    });

    if (cat) {
      return {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        shortDescription: cat.shortDescription,
        bannerImage: cat.bannerImage,
        featuredImage: cat.featuredImage,
        productSlugs: (() => {
          try {
            return JSON.parse(cat.productSlugs);
          } catch {
            return [];
          }
        })(),
      };
    }
  } catch (e) {
    console.error("[DB getProductCategoryBySlug Error]", e);
  }

  return baseCategories.find((c) => c.slug === slug) || null;
}

// ----------------- Industry & Service Helpers -----------------

export async function getAllIndustries() {
  try {
    await initDatabase();
    const list = await prisma.industry.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    if (list && list.length > 0) {
      return list.map((ind) => ({
        slug: ind.slug,
        name: ind.name,
        tagline: ind.tagline,
        image: ind.image,
        description: ind.description,
        challenges: (() => {
          try {
            return JSON.parse(ind.challenges);
          } catch {
            return [];
          }
        })(),
        solutions: (() => {
          try {
            return JSON.parse(ind.solutions);
          } catch {
            return [];
          }
        })(),
        products: (() => {
          try {
            return JSON.parse(ind.products);
          } catch {
            return [];
          }
        })(),
      }));
    }
  } catch (e) {
    console.error("[DB getAllIndustries Error]", e);
  }

  return baseIndustries;
}

export async function getIndustryBySlug(slug: string) {
  try {
    await initDatabase();
    const clean = slug.trim().toLowerCase();
    const ind = await prisma.industry.findUnique({
      where: { slug: clean },
    });

    if (ind) {
      return {
        slug: ind.slug,
        name: ind.name,
        tagline: ind.tagline,
        image: ind.image,
        description: ind.description,
        challenges: (() => {
          try {
            return JSON.parse(ind.challenges);
          } catch {
            return [];
          }
        })(),
        solutions: (() => {
          try {
            return JSON.parse(ind.solutions);
          } catch {
            return [];
          }
        })(),
        products: (() => {
          try {
            return JSON.parse(ind.products);
          } catch {
            return [];
          }
        })(),
      };
    }
  } catch (e) {
    console.error("[DB getIndustryBySlug Error]", e);
  }

  return baseIndustries.find((i) => i.slug === slug) || null;
}

export async function getAllServices() {
  try {
    await initDatabase();
    const list = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    if (list && list.length > 0) {
      return list.map((srv) => ({
        slug: srv.slug,
        name: srv.name,
        description: srv.description,
        icon: srv.icon,
        deliverables: (() => {
          try {
            return JSON.parse(srv.deliverables);
          } catch {
            return [];
          }
        })(),
      }));
    }
  } catch (e) {
    console.error("[DB getAllServices Error]", e);
  }

  return baseServices;
}

// ----------------- Enquiry Helpers -----------------

export async function saveEnquiryRecord(data: {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  productOrService?: string;
  requirement?: string;
  quantity?: string;
  city?: string;
  message?: string;
}) {
  await initDatabase();

  const enquiry = await prisma.enquiry.create({
    data: {
      name: data.name.trim(),
      companyName: (data.companyName || "").trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      productOrService: data.productOrService || "General Cleanroom / HVAC Inquiry",
      requirement: data.requirement || "",
      quantity: data.quantity || "1 Unit / Project",
      city: (data.city || "").trim(),
      message: (data.message || "").trim(),
      status: "new",
    },
  });

  return enquiry;
}

export async function getEnquiriesList(options: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  await initDatabase();
  const { status, search, page = 1, limit = 20 } = options;

  const whereClause: any = {};
  if (status && status !== "all") {
    whereClause.status = status;
  }
  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
      { companyName: { contains: search } },
      { productOrService: { contains: search } },
    ];
  }

  const [total, enquiries] = await Promise.all([
    prisma.enquiry.count({ where: whereClause }),
    prisma.enquiry.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    enquiries,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

// ----------------- Blog Query Helpers (Preserved) -----------------

export interface GetBlogsOptions {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
  includeDrafts?: boolean;
}

function formatDateString(val: any): string {
  if (!val) return new Date().toISOString();
  if (val instanceof Date) return val.toISOString();
  return String(val);
}

export async function getPublishedBlogs(options: GetBlogsOptions = {}) {
  await initDatabase();

  const { query, category, page = 1, limit = 12, includeDrafts = false } = options;

  const whereClause: any = {};

  if (!includeDrafts) {
    whereClause.isDraft = false;
  }

  if (category) {
    whereClause.category = {
      equals: category,
    };
  }

  if (query) {
    whereClause.OR = [
      { title: { contains: query } },
      { excerpt: { contains: query } },
      { content: { contains: query } },
    ];
  }

  const [total, posts] = await Promise.all([
    prisma.blog.count({ where: whereClause }),
    prisma.blog.findMany({
      where: whereClause,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        imageAlt: true,
        category: true,
        publishedAt: true,
        createdAt: true,
        author: true,
        isDraft: true,
      },
    }),
  ]);

  const formattedPosts = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
    imageAlt: p.imageAlt || p.title,
    categories: [p.category],
    date: formatDateString(p.publishedAt || p.createdAt),
    author: p.author,
    isDraft: p.isDraft,
  }));

  return {
    posts: formattedPosts,
    total,
    totalPages: Math.ceil(total / limit) || 1,
    currentPage: page,
  };
}

export async function getBlogPostBySlug(slug: string, allowDraft = false) {
  await initDatabase();

  const cleanSlug = slug.trim().toLowerCase();

  const post = await prisma.blog.findUnique({
    where: { slug: cleanSlug },
  });

  if (post) {
    if (post.isDraft && !allowDraft) {
      return null;
    }

    prisma.blog
      .update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      })
      .catch(() => {});

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      imageAlt: post.imageAlt || post.title,
      categories: [post.category],
      date: formatDateString(post.publishedAt || post.createdAt),
      author: post.author,
      seoTitle: post.seoTitle || `${post.title} | Peter Air Systems`,
      metaDescription: post.metaDescription || post.excerpt,
      canonicalUrl: post.canonicalUrl || `https://peterairs.com/blog/${post.slug}/`,
      ogImage: post.ogImage || post.featuredImage,
      isDraft: post.isDraft,
    };
  }

  // Check redirects if slug not found
  const redirect = await prisma.redirect.findUnique({
    where: { sourcePath: `/blog/${cleanSlug}` },
  });

  if (redirect) {
    return {
      redirectUrl: redirect.destinationPath,
      statusCode: redirect.statusCode,
    };
  }

  return null;
}

export async function getLatestPublishedBlogs(limit = 3) {
  await initDatabase();

  const posts = await prisma.blog.findMany({
    where: { isDraft: false },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      category: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
    categories: [p.category],
    date: formatDateString(p.publishedAt || p.createdAt),
  }));
}

export async function getAllBlogSlugs(): Promise<string[]> {
  await initDatabase();

  const posts = await prisma.blog.findMany({
    where: { isDraft: false },
    select: { slug: true },
  });

  return posts.map((p) => p.slug);
}

export async function getSiteContentValue(key: string, fallback: string): Promise<string> {
  try {
    await initDatabase();
    const entry = await prisma.siteContent.findUnique({
      where: { key },
      select: { value: true },
    });
    return entry?.value || fallback;
  } catch {
    return fallback;
  }
}
