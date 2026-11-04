const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const targetDir = path.resolve('data/json-db');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

function generateId() {
  return "cl" + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function loadTs(file) {
  const code = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', js);
  fn(m, m.exports, require);
  return m.exports;
}

// 1. Admin User
const users = [
  {
    id: "admin-master-user",
    email: process.env.ADMIN_DEFAULT_EMAIL || "admin@peterairs.com",
    name: "Peter Air Administrator",
    passwordHash: "$2b$10$iM.oI7z3h8m7Wb1cQ2XfEuH7R6qKpL5e3N1V9xZ0tG2o4Y8sA6eCu",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
try {
  const bcrypt = require('bcryptjs');
  users[0].passwordHash = bcrypt.hashSync("Admin@123", 10);
} catch (e) {}
fs.writeFileSync(path.join(targetDir, 'users.json'), JSON.stringify(users, null, 2), 'utf8');
console.log('Seeded users.json');

// 2. Product Categories
try {
  const { categories: rawCategories } = loadTs('src/data/categories.ts');
  let order = 1;
  const pCats = (rawCategories || []).map(c => ({
    id: generateId(),
    slug: c.slug,
    name: c.name,
    shortDescription: c.shortDescription || "",
    bannerImage: c.bannerImage || "/images/ahu_banner.png",
    featuredImage: c.featuredImage || "/images/AHU.jpeg",
    productSlugs: JSON.stringify(c.productSlugs || []),
    displayOrder: order++,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  fs.writeFileSync(path.join(targetDir, 'product-categories.json'), JSON.stringify(pCats, null, 2), 'utf8');
  console.log(`Seeded product-categories.json (${pCats.length} categories)`);
} catch (e) {
  console.warn('Error reading categories.ts:', e.message);
}

// 3. Products
try {
  const { products: rawProducts } = loadTs('src/data/products.ts');
  let order = 1;
  const prods = (rawProducts || []).map(p => ({
    id: generateId(),
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
    faq: JSON.stringify(p.faqs || p.faq || []),
    displayOrder: order++,
    isPublished: true,
    isFeatured: order <= 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  fs.writeFileSync(path.join(targetDir, 'products.json'), JSON.stringify(prods, null, 2), 'utf8');
  console.log(`Seeded products.json (${prods.length} products)`);
} catch (e) {
  console.warn('Error reading products.ts:', e.message);
}

// 4. Industries
try {
  const { industries: rawInd } = loadTs('src/data/industries.ts');
  let order = 1;
  const industries = (rawInd || []).map(ind => ({
    id: generateId(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  fs.writeFileSync(path.join(targetDir, 'industries.json'), JSON.stringify(industries, null, 2), 'utf8');
  console.log(`Seeded industries.json (${industries.length} industries)`);
} catch (e) {
  console.warn('Error reading industries.ts:', e.message);
}

// 5. Services
try {
  const { services: rawSrv } = loadTs('src/data/services.ts');
  let order = 1;
  const services = (rawSrv || []).map(srv => ({
    id: generateId(),
    slug: srv.slug,
    name: srv.name,
    description: srv.description || "",
    icon: srv.icon || "ShieldCheck",
    deliverables: JSON.stringify(srv.deliverables || []),
    displayOrder: order++,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  fs.writeFileSync(path.join(targetDir, 'services.json'), JSON.stringify(services, null, 2), 'utf8');
  console.log(`Seeded services.json (${services.length} services)`);
} catch (e) {
  console.warn('Error reading services.ts:', e.message);
}

// 6. Hero Slides
const defaultSlides = [
  {
    id: generateId(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
fs.writeFileSync(path.join(targetDir, 'hero-slides.json'), JSON.stringify(defaultSlides, null, 2), 'utf8');
console.log('Seeded hero-slides.json');

// 7. Base Blogs & Categories
try {
  const { blogPosts: rawBlogs } = loadTs('src/data/blogs.ts');
  const categoriesMap = new Map();

  const blogs = (rawBlogs || []).map(b => {
    const cat = b.categories?.[0] || "Cleanroom Components";
    const catSlug = cat.toLowerCase().replace(/[^\w-]/g, "-").replace(/-+/g, "-");
    if (!categoriesMap.has(catSlug)) {
      categoriesMap.set(catSlug, {
        id: generateId(),
        name: cat,
        slug: catSlug,
        description: `Industrial cleanroom and HVAC technical articles in ${cat}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return {
      id: generateId(),
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt || b.title,
      content: b.content || `<p>${b.excerpt || b.title}</p>`,
      featuredImage: b.featuredImage || "/images/AHU.jpeg",
      imageAlt: b.title,
      author: "Peter Air Systems Engineering Team",
      category: cat,
      tags: (b.categories || []).join(", "),
      isDraft: false,
      publishedAt: new Date(b.date || Date.now()).toISOString(),
      createdAt: new Date(b.date || Date.now()).toISOString(),
      updatedAt: new Date().toISOString(),
      seoTitle: `${b.title} | Peter Air Systems`,
      metaDescription: (b.excerpt || b.title).slice(0, 160),
      canonicalUrl: `https://peterairs.com/blog/${b.slug}/`,
      views: 0,
      isBase: true,
    };
  });
  fs.writeFileSync(path.join(targetDir, 'blogs.json'), JSON.stringify(blogs, null, 2), 'utf8');
  console.log(`Seeded blogs.json (${blogs.length} articles)`);

  const cats = Array.from(categoriesMap.values());
  fs.writeFileSync(path.join(targetDir, 'categories.json'), JSON.stringify(cats, null, 2), 'utf8');
  console.log(`Seeded categories.json (${cats.length} blog categories)`);
} catch (e) {
  console.warn('Error reading blogs.ts:', e.message);
}

// 8. Site Content
const siteContent = [
  { id: generateId(), key: "company.name", section: "company", label: "Company Legal Name", value: "Peter Air Systems", updatedAt: new Date().toISOString() },
  { id: generateId(), key: "company.tagline", section: "company", label: "Brand Tagline", value: "Leading Manufacturers of HVAC & Cleanroom Equipment", updatedAt: new Date().toISOString() },
  { id: generateId(), key: "contact.phone.primary", section: "contact", label: "Primary Sales Helpline", value: "+91 97148 77717", updatedAt: new Date().toISOString() },
  { id: generateId(), key: "contact.phone.secondary", section: "contact", label: "Technical Support", value: "+91 94273 00811", updatedAt: new Date().toISOString() },
  { id: generateId(), key: "contact.whatsapp", section: "contact", label: "WhatsApp Direct", value: "+91 97148 77717", updatedAt: new Date().toISOString() },
  { id: generateId(), key: "contact.email.sales", section: "contact", label: "Sales & Inquiries Email", value: "sales@peterairs.com", updatedAt: new Date().toISOString() },
  { id: generateId(), key: "contact.email.direct", section: "contact", label: "Direct Engineering Email", value: "peterairsystem@gmail.com", updatedAt: new Date().toISOString() },
  { id: generateId(), key: "contact.address", section: "contact", label: "Factory & Works Address", value: "Plot No. 58, 59, 60, Shyamal Industrial Park, B/h. Shivam Hotel, Bakrol-Bujrang, Ta. Daskroi, Dist. Ahmedabad - 382433, Gujarat, India", updatedAt: new Date().toISOString() },
  { id: generateId(), key: "contact.workingHours", section: "contact", label: "Working Hours", value: "Monday to Saturday: 9:00 AM - 7:00 PM IST", updatedAt: new Date().toISOString() }
];
fs.writeFileSync(path.join(targetDir, 'site-content.json'), JSON.stringify(siteContent, null, 2), 'utf8');
console.log('Seeded site-content.json');

// 9. Enquiries
let enquiries = [];
if (fs.existsSync('data/enquiries.json')) {
  try {
    enquiries = JSON.parse(fs.readFileSync('data/enquiries.json', 'utf8'));
  } catch(e){}
}
fs.writeFileSync(path.join(targetDir, 'enquiries.json'), JSON.stringify(enquiries, null, 2), 'utf8');
console.log(`Seeded enquiries.json (${enquiries.length} enquiries)`);

// 10. Tags, Media, Redirects, Page Content
['tags', 'media', 'redirects', 'page-content'].forEach(f => {
  const filePath = path.join(targetDir, `${f}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
    console.log(`Seeded empty ${f}.json`);
  }
});

console.log('All JSON database collections initialized successfully!');
