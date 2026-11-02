const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const rawPages = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'raw_pages.json'), 'utf8'));
const auditPages = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'all_pages_audit.json'), 'utf8'));
const processedPosts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'processed_posts.json'), 'utf8'));

// 1. Site Config
const siteConfig = {
  name: "Peter Air Systems",
  legalName: "Peter Air Systems",
  tagline: "Air Handling Units & Cleanroom Solutions",
  description: "Peter Air Systems is India's premier manufacturer and exporter of Air Handling Units (AHUs), Clean Room Equipment, HVAC Products, and Precision Air Filters for pharmaceutical, biotechnology, healthcare, and industrial cleanrooms.",
  url: "https://peterairs.com",
  contact: {
    phonePrimary: "+91 8484 836 337",
    phoneSecondary: "+91 7350 336 337",
    whatsapp: "+91 8484 836 337",
    whatsappLink: "https://wa.me/918484836337",
    emailSales: "sales@peterairs.com",
    emailDirect: "sanjay@peterairs.com",
    address: "Unit No. - 01, 02, 03 and 06, Agarwal Industrial Estate, Golani, Vasai East, Palghar - 401208, Mumbai, Maharashtra, India.",
    workingHours: "Monday - Saturday: 9:00 AM - 6:30 PM (IST)",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pinCode: "401208",
  },
  certifications: [
    "ISO 9001:2015 Certified Quality Management System",
    "CE Certified Engineering Solutions",
    "GMP Compliant Manufacturing Standards",
    "ASHRAE / EN 779 / EN 1822 Filtration Compliance"
  ],
  footerCredit: {
    label: "Developed by Integral Web Solution",
    url: "https://integralwebsolution.com/"
  }
};

fs.writeFileSync(path.join(outDir, 'siteConfig.ts'), `export const siteConfig = ${JSON.stringify(siteConfig, null, 2)};\n`);
console.log('siteConfig.ts created.');

// 2. Build Category and Product definitions
const categories = [
  {
    id: "air-handling-hvac",
    slug: "air-handling-unit-ahu",
    name: "Air Handling & HVAC Systems",
    shortDescription: "Heavy-duty custom Air Handling Units (AHU), Air Washer Units, and Dehumidification Systems designed for precision temperature, humidity, and airflow control in critical manufacturing environments.",
    bannerImage: "/images/ahu_banner.png",
    featuredImage: "/images/AHU.jpeg",
    productSlugs: [
      "air-handling-unit-ahu",
      "air-washer-unit",
      "dehumidifier-unit"
    ]
  },
  {
    id: "clean-room-equipment",
    slug: "clean-room-equipment",
    name: "Cleanroom Equipment",
    shortDescription: "Precision SS 304/316 engineered cleanroom containment and transfer equipment including Air Showers, Pass Boxes, Bio Safety Cabinets, Dispensing Booths, and Laminar Flow Stations.",
    bannerImage: "/images/7-1.png",
    featuredImage: "/images/Air-Showers.jpg",
    productSlugs: [
      "air-shower",
      "static-pass-box",
      "dynamic-pass-box",
      "bio-safety-cabinets",
      "laminar-work-stations",
      "dispensing-booth",
      "garment-cabinet",
      "reverse-laminar-flow-unit",
      "ceiling-suspended-laminar"
    ]
  },
  {
    id: "air-filters",
    slug: "air-filters",
    name: "Air Filtration Systems",
    shortDescription: "High-efficiency particulate filtration solutions from G4 Pre Filters and F7/F9 Fine Microvee Filters to H13/H14 HEPA and Ultra-Low Penetration Mini Pleat HEPA filters.",
    bannerImage: "/images/Hepa-Filter.jpg",
    featuredImage: "/images/hepa-fite.jpg",
    productSlugs: [
      "enhance-air-quality-with-pre-filters",
      "fine-filter",
      "hepa-filter",
      "mini-pleat-hepa-filter"
    ]
  },
  {
    id: "hvac-products",
    slug: "hvac-products",
    name: "HVAC Terminal Products & Air Distribution",
    shortDescription: "Engineered airflow control components including HEPA Terminal Housings, Supply & Return Grilles, Aerodynamic Diffusers, Return Air Risers, and Volume Control Dampers.",
    bannerImage: "/images/ahu_banner.png",
    featuredImage: "/images/HEPA-Terminal-Box.jpg",
    productSlugs: [
      "hepa-terminal-box",
      "supply-return-air-grille",
      "supply-return-air-diffuser",
      "volume-control-damper-v-c-d",
      "return-air-riser"
    ]
  },
  {
    id: "cleanroom-solutions",
    slug: "cleanroom-turnkey-solution",
    name: "Cleanroom Solutions & Turnkey Systems",
    shortDescription: "Full turnkey cleanroom design, modular wall & ceiling panels, airtight GMP modular doors, and state-of-the-art Modular Operation Theatres (OT) with laminar air ceiling.",
    bannerImage: "/images/OT.jpg",
    featuredImage: "/images/MODULAR-CLEAN-ROOM-VALIDATION-MAINTENANCE.jpg",
    productSlugs: [
      "modular-cleanroom-solution",
      "modular-ot",
      "modular-clean-room-doors",
      "cleanroom-turnkey-solution"
    ]
  },
  {
    id: "laboratory-equipment",
    slug: "other-products-laboratory-equipment",
    name: "Laboratory & Environmental Test Chambers",
    shortDescription: "BOD Incubators, Stability Chambers, Bacteriological Incubators, Hot Air Ovens, and specialized precision laboratory test apparatus.",
    bannerImage: "/images/Bod-Incubator.jpg",
    featuredImage: "/images/Bod-Incubator.jpg",
    productSlugs: [
      "other-products-laboratory-equipment"
    ]
  }
];

fs.writeFileSync(path.join(outDir, 'categories.ts'), `export const categories = ${JSON.stringify(categories, null, 2)};\n`);
console.log('categories.ts created.');

// 3. Extract and parse rich product content
const auditMap = {};
auditPages.forEach(p => {
  auditMap[p.slug] = p;
});

// Map local image paths for products
const productImageMap = {
  "air-handling-unit-ahu": "/images/AHU.jpeg",
  "air-washer-unit": "/images/Air-Washer-Unit.jpg",
  "dehumidifier-unit": "/images/Dehumidifier-Unit.jpg",
  "air-shower": "/images/Air-Showers.jpg",
  "static-pass-box": "/images/Static-Pass-Box.jpg",
  "dynamic-pass-box": "/images/Dynamic-Pass-Box.jpg",
  "bio-safety-cabinets": "/images/Bio-Safety-Cabinets.jpg",
  "laminar-work-stations": "/images/Laminar-Work-Stations.jpg",
  "dispensing-booth": "/images/Dispensing-Booth.jpg",
  "garment-cabinet": "/images/Garment-Cabinet.jpg",
  "reverse-laminar-flow-unit": "/images/Reverse-Laminar-Flow-Unit.jpg",
  "ceiling-suspended-laminar": "/images/Ceiling-Suspended-Laminar.jpg",
  "modular-clean-room-doors": "/images/Modular-Clean-Room-Doors.jpg",
  "modular-ot": "/images/OT.jpg",
  "modular-cleanroom-solution": "/images/MODULAR-CLEAN-ROOM-PANELS.jpg",
  "cleanroom-turnkey-solution": "/images/MODULAR-CLEAN-ROOM-VALIDATION-MAINTENANCE.jpg",
  "enhance-air-quality-with-pre-filters": "/images/Pre-Filters.jpg",
  "fine-filter": "/images/Fine-Filter.jpg",
  "hepa-filter": "/images/hepa-fite.jpg",
  "mini-pleat-hepa-filter": "/images/Mini-Pleat-Hepa-Filter.jpg",
  "hepa-terminal-box": "/images/HEPA-Terminal-Box.jpg",
  "supply-return-air-grille": "/images/Supply-Return-Air-Grille.jpg",
  "supply-return-air-diffuser": "/images/Supply-Return-Air-Diffuser.jpg",
  "volume-control-damper-v-c-d": "/images/Volume-Control-Damper.jpg",
  "return-air-riser": "/images/Return-Air-Riser.jpg",
  "other-products-laboratory-equipment": "/images/Bod-Incubator.jpg",
  "air-filters": "/images/Hepa-Filter.jpg",
  "hvac-products": "/images/HEPA-Terminal-Box.jpg",
  "clean-room-equipment": "/images/Air-Showers.jpg"
};

const products = [];

for (const cat of categories) {
  for (const slug of cat.productSlugs) {
    if (products.find(p => p.slug === slug)) continue;
    const page = rawPages.find(p => p.slug === slug);
    const audit = auditMap[slug] || {};

    if (!page) continue;

    const rawContent = page.content.rendered;
    // Extract tables
    const tableMatches = [...rawContent.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)].map(m => m[0]);
    // Extract FAQs
    const faqMatches = [];
    const faqRegex = /<h[34][^>]*>(.*?\?.*?)<\/h[34]>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    let fm;
    while ((fm = faqRegex.exec(rawContent)) !== null) {
      faqMatches.push({
        question: fm[1].replace(/<[^>]+>/g, '').trim(),
        answer: fm[2].replace(/<[^>]+>/g, '').trim()
      });
    }

    // Clean description paragraphs
    const paragraphs = [...rawContent.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
      .filter(p => p.length > 50 && !p.toLowerCase().includes('click here') && !p.toLowerCase().includes('enquiry'));

    // Extract lists/features
    const features = [];
    const liMatches = [...rawContent.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
      .filter(l => l.length > 10 && l.length < 250);

    products.push({
      id: page.id,
      slug: slug,
      categorySlug: cat.slug,
      categoryName: cat.name,
      title: page.title.rendered,
      seoTitle: audit.title || (page.title.rendered + " Manufacturer in India | Peter Air Systems"),
      metaDescription: audit.metaDescription || (page.title.rendered + " engineered by Peter Air Systems for pharmaceutical, cleanroom, and HVAC applications."),
      canonical: audit.canonical || (`https://peterairs.com/${slug}/`),
      h1: (audit.h1 && audit.h1[0]) ? audit.h1[0] : page.title.rendered,
      image: productImageMap[slug] || "/images/AHU.jpeg",
      bannerImage: "/images/ahu_banner.png",
      overview: paragraphs.slice(0, 3).join('\n\n') || "Engineered for maximum reliability, durability, and compliance with international cleanroom standards.",
      fullContent: rawContent,
      paragraphs: paragraphs,
      features: features.slice(0, 10),
      tables: tableMatches,
      faqs: faqMatches.slice(0, 6),
      applications: [
        "Pharmaceutical Formulations & Bulk Drugs (API)",
        "Biotechnology & Life Sciences Laboratories",
        "Hospital Operating Theatres & Critical Care",
        "Medical Device & Sterile Packaging Units",
        "Electronics & Semiconductor Microfabrication",
        "Precision Food Processing & Dairy Plants"
      ],
      materials: [
        "Stainless Steel SS 304 / SS 316 / SS 316L (Grit 240 / 320 Hairline or Mirror Finish)",
        "Thermal Break Extruded Aluminium Frame Profiles (Pentapost Design)",
        "Pre-Coated Galvanized Iron (GI) Outer Skin / Powder-Coated Finish",
        "High-Density CFC/HFC Free Polyurethane Foam (PUF) Insulation (40 kg/m³)"
      ]
    });
  }
}

fs.writeFileSync(path.join(outDir, 'products.ts'), `export const products = ${JSON.stringify(products, null, 2)};\n`);
console.log(`products.ts created with ${products.length} products.`);

// 4. Industries
const industries = [
  {
    slug: "pharmaceuticals",
    name: "Pharmaceuticals & APIs",
    tagline: "GMP & USFDA Compliant HVAC & Cleanroom Solutions",
    image: "/images/Pharmaceuticals.jpg",
    description: "In pharmaceutical tablet, capsule, liquid sterile injectable, and active pharmaceutical ingredient (API) manufacturing, contamination control is paramount. Peter Air Systems provides Class 100 (ISO 5) to Class 100,000 (ISO 8) modular cleanrooms, laminar airflow workstations, dispensing booths, and precision AHUs that strictly comply with cGMP, WHO-GMP, and USFDA regulatory standards.",
    challenges: [
      "Cross-contamination during active ingredient dispensing and sampling",
      "Strict pressure differential cascades between processing rooms and corridors",
      "Tight relative humidity and temperature tolerance for hygroscopic formulations",
      "Stringent validation, FAT, DQ/IQ/OQ/PQ documentation requirements"
    ],
    solutions: [
      "Custom AHUs with Heat Recovery Wheels and Desiccant Dehumidifiers",
      "Reverse Laminar Airflow (RLAF) dispensing and sampling booths with 99.997% HEPA filters",
      "Static and Dynamic Interlocking Pass Boxes for safe cross-boundary material transfer",
      "Modular PUF panel cleanrooms with flush coving and airtight GMP doors"
    ],
    products: ["air-handling-unit-ahu", "dynamic-pass-box", "dispensing-booth", "air-shower", "modular-clean-room-doors"]
  },
  {
    slug: "biotechnology",
    name: "Biotechnology & Life Sciences",
    tagline: "Aseptic Containment & High-Integrity Air Handling",
    image: "/images/Biotechnology.jpg",
    description: "Biotechnology and microbial fermentation facilities require zero-leakage biocontainment and ultra-pure air filtration. We manufacture Class II Type A2 & B2 Biological Safety Cabinets, Laminar Work Stations, and mini-pleat HEPA filtered air handling units that protect both the sensitive biological samples and laboratory personnel.",
    challenges: [
      "Containment of biohazardous agents and aerosolized pathogens",
      "Prevention of cell culture contamination from particulate ingress",
      "Precise laminar unidirectional airflow velocities (0.45 m/s ± 20%)",
      "Hermetic sealing of ductwork and pass-through openings"
    ],
    solutions: [
      "Class II Biological Safety Cabinets with microprocessor airflow monitoring",
      "Ceiling-suspended laminar airflow hoods over bioreactors and sterile fill lines",
      "H14 HEPA and U15 ULPA filtration modules with gel-seal integrity",
      "Dynamic HEPA-purged pass boxes with UV germicidal interlocks"
    ],
    products: ["bio-safety-cabinets", "laminar-work-stations", "hepa-filter", "ceiling-suspended-laminar"]
  },
  {
    slug: "healthcare-hospitals",
    name: "Healthcare & Modular Operating Theatres",
    tagline: "Infection Control & Ultra-Clean Surgical Environments",
    image: "/images/Healthcare.jpg",
    description: "Modern surgical suites and intensive care units require sterile surgical zones free from airborne bacteria and colony-forming units. Peter Air Systems engineers turnkey Modular Operation Theatres (Modular OT), complete with stainless steel laminar flow ceilings, surgical panels, anti-static flooring, and hygienic air handling systems.",
    challenges: [
      "Minimizing Surgical Site Infections (SSIs) during long procedures",
      "Uniform downward unidirectional airflow over the surgical table",
      "Positive room pressurization to prevent non-sterile air infiltration",
      "Seamless anti-microbial wall paneling resistant to chemical disinfectants"
    ],
    solutions: [
      "Turnkey Modular Operation Theatres with surgical control panels and laminar ceilings",
      "Hygienic double-skin AHUs with UV-C germicidal irradiation banks",
      "Airtight hermetically sealed sliding OT doors with sensor activation",
      "Low-level return air risers with washable pre-filters"
    ],
    products: ["modular-ot", "return-air-riser", "modular-clean-room-doors", "air-handling-unit-ahu"]
  },
  {
    slug: "chemicals-specialty",
    name: "Chemicals & Specialty Processing",
    tagline: "Corrosion-Resistant Ventilation & Hazardous Fume Control",
    image: "/images/Chemicals.jpg",
    description: "Chemical formulation, polymer synthesis, and specialty chemical facilities operate under aggressive vapor and particulate loads. Peter Air Systems engineers heavy-duty air washers, scrubbers, explosion-proof blowers, and corrosion-resistant air distribution systems built from high-grade SS 316 and coated steel.",
    challenges: [
      "Corrosion from acidic, alkaline, or solvent vapors",
      "Explosion-proof (ATEX/Flameproof) motor and electrical requirements",
      "High volume toxic dust collection and exhaust neutralization",
      "Heavy duty thermal and humidity fluctuations"
    ],
    solutions: [
      "Air Washer Units with cellulose/PVC evaporative pads and mist eliminators",
      "SS 316 construction for all wetted surfaces and air paths",
      "Volume Control Dampers with aerodynamic airfoil blades and motorized actuators",
      "Heavy gauge return air risers and industrial grilles"
    ],
    products: ["air-washer-unit", "volume-control-damper-v-c-d", "supply-return-air-grille"]
  },
  {
    slug: "electronics-semiconductor",
    name: "Electronics & Semiconductor",
    tagline: "Sub-Micron Particulate Control & ESD-Safe Enclosures",
    image: "/images/Electronics.jpg",
    description: "Semiconductor fabrication, micro-optics, SMT assembly, and printed circuit board manufacturing demand ultra-low particle counts and electrostatic discharge (ESD) protection. We design Class 10 to Class 1,000 cleanrooms equipped with high-velocity air showers, mini-pleat HEPA filters, and ESD-safe cleanroom equipment.",
    challenges: [
      "Sub-micron airborne particle defects on silicon wafers and circuit paths",
      "Electrostatic discharge damaging sensitive CMOS components",
      "Strict temperature stability (±0.5°C) and RH control (±3%)",
      "High air change rates (60 to 300+ ACPH)"
    ],
    solutions: [
      "High-velocity (20-25 m/s) Air Showers with multi-directional nozzles",
      "Mini Pleat HEPA filters with low pressure drop and laminar air distribution",
      "Modular cleanrooms with conductive anti-static PVC flooring",
      "Dehumidification systems with precision VFD modulating controls"
    ],
    products: ["air-shower", "mini-pleat-hepa-filter", "modular-cleanroom-solution", "dehumidifier-unit"]
  }
];

fs.writeFileSync(path.join(outDir, 'industries.ts'), `export const industries = ${JSON.stringify(industries, null, 2)};\n`);
console.log('industries.ts created.');

// 5. Services
const services = [
  {
    slug: "cleanroom-turnkey-execution",
    name: "Turnkey Cleanroom EPC Execution",
    description: "Complete concept-to-commissioning execution for Class 100 to Class 100,000 cleanrooms including civil architectural paneling, HVAC systems, electricals, BMS, and validation.",
    icon: "ShieldCheck",
    deliverables: [
      "Cleanroom concept layout & heat load calculation",
      "Modular wall, ceiling, and coving installation",
      "Ductwork fabrication and thermal insulation",
      "Integrated electrical lighting and interlocking doors"
    ]
  },
  {
    slug: "pharma-hvac-validation",
    name: "Pharma HVAC Design & Validation",
    description: "Full regulatory validation conforming to Schedule M, USFDA, and WHO-GMP guidelines. We assist with DQ, IQ, OQ, and PQ validation protocols and on-site testing.",
    icon: "FileCheck",
    deliverables: [
      "Design Qualification (DQ) review and airflow schematics",
      "Installation Qualification (IQ) & Operational Qualification (OQ)",
      "Performance Qualification (PQ) support",
      "Complete FAT and SAT documentation dossiers"
    ]
  },
  {
    slug: "ahu-energy-optimization",
    name: "AHU Optimization & Energy Audits",
    description: "Retrofitting and optimizing existing air handling units to dramatically cut electrical consumption while enhancing air quality, VFD modulation, and heat recovery.",
    icon: "Gauge",
    deliverables: [
      "Static pressure and CFM flow diagnostics",
      "VFD variable frequency drive integration",
      "Enthalpy heat recovery wheel retrofits",
      "Blower balancing and vibration isolation"
    ]
  },
  {
    slug: "cleanroom-airflow-balancing",
    name: "Airflow Balancing & Filter Integrity Testing",
    description: "DOP/PAO aerosol challenge testing for HEPA filters, particle count validation, room pressurization balancing, and air velocity profile verification.",
    icon: "Wind",
    deliverables: [
      "DOP / PAO HEPA filter leak detection scanning",
      "Air changes per hour (ACPH) calculation and balancing",
      "Room differential pressure cascade commissioning",
      "Non-viable particle count testing across ISO classes"
    ]
  }
];

fs.writeFileSync(path.join(outDir, 'services.ts'), `export const services = ${JSON.stringify(services, null, 2)};\n`);
console.log('services.ts created.');

// 6. Blog Posts
fs.writeFileSync(path.join(outDir, 'blogs.ts'), `export const blogPosts = ${JSON.stringify(processedPosts, null, 2)};\n`);
console.log(`blogs.ts created with ${processedPosts.length} posts.`);
