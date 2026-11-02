const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { decodeHtmlEntities, stripHtmlToText, deepDecodeEntities } = require('./textUtils');

const prisma = new PrismaClient();

async function main() {
  console.log('=== Step 1: Cleaning products.ts ===');
  const rawPages = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'raw_pages.json'), 'utf8'));
  let rawProducts = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.ts'), 'utf8');
  rawProducts = rawProducts.replace(/^export const products\s*=\s*/, '').replace(/;\s*$/, '');
  const prods = JSON.parse(rawProducts);

  // Curated high-accuracy features for all 26 products
  const featuresMap = {
    'air-handling-unit-ahu': [
      "Double-skin PUF insulated panels (25mm / 43mm / 50mm) with 40 kg/m³ density",
      "Thermal break hollow extruded aluminium pentapost frame profile",
      "Direct-driven or belt-driven high-efficiency backward curved aerofoil blowers",
      "Multi-stage filtration: Washable pre-filters, microvee fine filters, and terminal HEPA",
      "Chilled water / direct expansion (DX) cooling coils with hydrophilic aluminium fins",
      "Custom airflow capacities engineered from 1,000 CFM to 40,000 CFM"
    ],
    'air-washer-unit': [
      "Cross-corrugated cellulose evaporative cooling media with high saturation efficiency",
      "Double skin PUF insulated panels with thermal break extruded aluminium profile",
      "Heavy-gauge stainless steel SS 304 water sump with overflow and drain connections",
      "High-efficiency PVC drift eliminator preventing water droplet carryover",
      "Submersible water pump with automatic water level sensor and quick-refill valve",
      "100% fresh air ventilation delivering 60-70% energy savings over standard AC"
    ],
    'dehumidifier-unit': [
      "High-performance desiccant silica gel rotor maintaining RH down to 10-20%",
      "Direct expansion (DX) refrigeration condensing unit with modulating thermal expansion",
      "Microprocessor-based digital humidity controller with real-time RH readout",
      "Double skin PUF insulated casing preventing casing sweating and condensation",
      "Integrated energy recovery reactivation heater with variable temperature control",
      "Heavy-duty SS 304 drainage pan and stainless steel coil casings"
    ],
    'air-shower': [
      "High-velocity stainless steel air nozzles delivering 20-25 m/s air scrub velocity",
      "Programmable microprocessor controller with adjustable cycle duration (0-99 sec)",
      "Two-stage filtration: G4 primary pre-filter and H14 mini-pleat HEPA filter (99.995%)",
      "Electromagnetic interlocked doors with toughened glass observation windows",
      "Emergency override push-button for instant door release and personnel safety",
      "Heavy-duty SS 304 / SS 316 or powder-coated GI construction with flush finish"
    ],
    'static-pass-box': [
      "Corrosion-resistant SS 304 / SS 316 construction with cGMP sanitary finish",
      "Electromagnetic or mechanical door interlocking preventing cross-contamination",
      "UV germicidal lamp (15W/30W) with digital hour meter for surface sterilization",
      "Double-glazed toughened safety glass view panels on both doors",
      "Audio-visual buzzer indicator for door opening and interlock status",
      "Flush internal radius coving for effortless cleaning and particulate prevention"
    ],
    'dynamic-pass-box': [
      "Integrated mini-pleat HEPA filter (H14 Grade) with 99.995% efficiency at 0.3 microns",
      "Internal vertical recirculating laminar airflow creating ISO Class 5 sterile zone",
      "Differential pressure Magnehelic gauge for continuous HEPA filter monitoring",
      "Electromagnetic interlocking doors with toughened glass inspection windows",
      "UV germicidal disinfection lamp with automated interlocked timer",
      "Sanitary SS 304 / SS 316 construction with seamless welded internal coving"
    ],
    'bio-safety-cabinets': [
      "Certified Class II Type A2 & B2 containment models meeting EN 12469 / NSF 49 standards",
      "Dual H14 HEPA / ULPA filtration with 99.997% efficiency at 0.3 microns",
      "Uniform 90 FPM ± 20 FPM downward laminar airflow velocity across work surface",
      "Ergonomic 10-degree sloped motorized or counterbalanced laminated safety glass sash",
      "Microprocessor control system with digital airflow velocity display and filter alarms",
      "SS 304 seamless dished work zone with drain valve for easy decontamination"
    ],
    'laminar-work-stations': [
      "Delivers ISO Class 5 (Class 100) clean environment in horizontal or vertical airflow",
      "High-efficiency H14 mini-pleat HEPA filter (99.995% efficiency at 0.3 microns)",
      "Perforated SS 304 sanitary work table with anti-vibration rubber mounts",
      "Dynamically balanced centrifugal blowers with multi-speed electronic control",
      "Transparent UV-absorbing acrylic / toughened glass side shields for maximum visibility",
      "Interlocked germicidal UV light with safety timer and glare-free LED illumination"
    ],
    'dispensing-booth': [
      "Reverse Laminar Airflow (RLAF) pattern protecting operator, product, and room environment",
      "Three-stage filtration: G4 primary, F9 intermediate microvee, and H14 supply HEPA",
      "Negative pressure containment preventing hazardous powder escape into corridors",
      "Magnehelic differential pressure gauges for each filtration stage",
      "Stainless steel SS 304 / SS 316 construction with internal coving for cGMP compliance",
      "Integrated PVC strip curtains or side glass panels bounding the sterile envelope"
    ],
    'garment-cabinet': [
      "Continuous vertical laminar airflow maintaining sterile storage for cleanroom garments",
      "Mini-pleat HEPA filtration providing ISO Class 5 air shower within the cabinet",
      "SS 304 / SS 316 mirror or hairline finish compliant with strict cGMP guidelines",
      "Integrated germicidal UV tube for overnight decontamination of cleanroom suits",
      "Segmented compartments with adjustable hanger rods and perforated shoe shelves",
      "Magnehelic gauge monitoring HEPA filter condition and differential pressure"
    ],
    'reverse-laminar-flow-unit': [
      "Downward recirculating air pattern drawing airborne powder away from breathing zones",
      "Primary G4 pre-filter, intermediate F9 microvee, and terminal H14 HEPA filters",
      "Maintains ISO Class 5 cleanliness across raw material sampling and dispensing zones",
      "Adjustable centrifugal blower speed to maintain design face velocity of 0.45 m/s",
      "Heavy-duty SS 304 construction with flush internal coving and sanitary drains",
      "Flameproof electrical switchgear options available for solvent handling areas"
    ],
    'ceiling-suspended-laminar': [
      "Suspended overhead laminar airflow canopy for sterile filling and sealing lines",
      "Generates ISO Class 5 unidirectional downward laminar velocity (0.45 m/s ± 20%)",
      "Mini-pleat H14 HEPA filters with protective face screens and DOP validation ports",
      "Flexible clear antistatic PVC strip curtains defining the aseptic processing zone",
      "Stainless steel SS 304 suspension brackets and turnbuckles for rigid overhead mounting",
      "Low-profile aerodynamic cleanroom light fixtures integrated within the ceiling grid"
    ],
    'enhance-air-quality-with-pre-filters': [
      "G3 / G4 filtration rating per EN 779 / ISO 16890 coarse particulate standards",
      "Washable and reusable 100% non-woven synthetic polyester filter media",
      "Low initial pressure drop (approx. 45 Pa) maximizing energy efficiency in AHUs",
      "Heavy-gauge extruded aluminium or galvanized iron (GI) outer frame construction",
      "Galvanized wire mesh support grill on both air entering and air leaving sides",
      "Standard and custom dimensions fabricated to fit all modular air handling units"
    ],
    'fine-filter': [
      "F7, F8, and F9 efficiency rating per EN 779 capturing particulates down to 1 micron",
      "Microvee extended surface box or flanged type configuration for high airflow",
      "Precision pleated micro-fiberglass or synthetic media with corrugated separators",
      "Protects terminal HEPA filters from premature dust loading, extending HEPA life",
      "Continuous leak-proof polyurethane gasket ensuring positive airtight sealing",
      "Available in standard 600x600mm dimensions and custom engineered depths"
    ],
    'hepa-filter': [
      "H13 (99.95%) and H14 (99.995%) efficiency at 0.3 micron Most Penetrating Particle Size",
      "Pleated sub-micron borosilicate micro-glass fiber paper with uniform pore structure",
      "Hot-melt thermoplastic or corrugated aluminium ribbon separators for laminar air throw",
      "Extruded anodized aluminium, galvanized iron, or SS 304 rigid casing options",
      "Individual factory aerosol leak tested and certified in accordance with EN 1822",
      "Seamless one-piece continuous gasket providing zero bypass leakage around housing"
    ],
    'mini-pleat-hepa-filter': [
      "Ultra-slim compact depth profile (50mm, 70mm, 85mm) ideal for space-constrained ceilings",
      "Thermoplastic bead separators delivering uniform pleat spacing and low resistance",
      "H14 Grade (99.995%) and U15 Grade (99.9995%) particulate filtration efficiency",
      "Extruded anodized aluminium frame with protective faceguards on both sides",
      "Lower energy consumption and longer operating life compared to deep-pleat filters",
      "100% factory scanned and validated per ISO 14644 and EN 1822 standards"
    ],
    'hepa-terminal-box': [
      "Airtight ceiling housing manufactured from heavy-duty SS 304 or powder-coated GI",
      "Integrated DOP / PAO test aerosol injection port and sampling connection",
      "Static pressure nozzles for differential pressure measurement across the HEPA filter",
      "Removable perforated or swirl diffuser faceplate for uniform air dispersion",
      "Side or top circular spigot duct connection with airtight collar",
      "Gel seal or neoprene mechanical gasket clamping ensuring zero particle bypass"
    ],
    'supply-return-air-grille': [
      "Extruded aluminium or stainless steel SS 304 construction with architectural finish",
      "Individually adjustable aerofoil blades for single or double horizontal/vertical deflection",
      "Integrated opposed blade damper (O.B.D) with screwdriver-operated volume adjustment",
      "Countersunk mounting holes or concealed spring clips for flush wall/ceiling installation",
      "Low noise acoustic design with minimal pressure resistance at rated CFM",
      "Available in powder-coated pure white, RAL custom colors, or natural anodized finish"
    ],
    'supply-return-air-diffuser': [
      "Multi-directional air distribution in 1-way, 2-way, 3-way, or 4-way radial patterns",
      "Removable center core assembly with spring latch for effortless duct and damper access",
      "Precision extruded aluminium profiles offering superior rigidity and finish",
      "Integrated opposed blade damper for accurate branch airflow balancing",
      "Designed for seamless flush fitment into standard metric and imperial ceiling grids",
      "Anti-smudge frame contour preventing dirt accumulation on adjacent ceiling tiles"
    ],
    'volume-control-damper-v-c-d': [
      "Opposed blade or parallel blade linkages for accurate linear airflow control",
      "Heavy-gauge galvanized iron (GI), extruded aluminium, or SS 304 frame construction",
      "Self-lubricating nylon/brass bushings ensuring smooth, low-friction blade movement",
      "Manual hand quadrant with locking lever and visual open/close position indicator",
      "Motorized actuator mounting bracket compatible with Belimo and Honeywell actuators",
      "Aerofoil blade profiles with synthetic edge seals for low closed-blade leakage"
    ],
    'return-air-riser': [
      "Slim wall-integrated profile engineered for modular cleanroom partition systems",
      "Integrated removable pre-filter / fine filter behind front grille for primary capture",
      "Heavy-gauge SS 304 or antibacterial powder-coated GI outer construction",
      "Perforated or horizontal louvered face with quick-release quarter-turn fasteners",
      "Acoustically lined internal sound-dampening insulation minimizing room cross-talk",
      "Manufactured in custom heights and depths to match exact room ceiling elevations"
    ],
    'modular-cleanroom-solution': [
      "Pre-engineered wall and walk-on ceiling panels (50mm / 80mm / 100mm PUF or Rockwool)",
      "Pre-coated galvanized iron (PCGI), SS 304, or high-pressure laminate (HPL) surfaces",
      "Flush internal aluminium or PVC coving on all wall-to-wall and floor junctions",
      "Integrated utility conduits, gas lines, return air risers, and electrical raceways",
      "Complete turnkey validation package: DQ, IQ, OQ, PQ per cGMP and USFDA guidelines",
      "Airtight interlocked modular doors with double-glazed flush view panels"
    ],
    'modular-ot': [
      "Laminar Air Flow Ceiling (LAFC) system delivering Class 100 sterile surgical zone",
      "Hermetically sealing touchless automatic sliding doors with perimeter airtight gasket",
      "Multi-function Surgical Control Panel (SCP) with time elapsed, temp, and RH display",
      "Stainless steel SS 304 surgeon scrub sinks with infrared sensor-activated taps",
      "Antibacterial seamless wall cladding resistant to repeated chemical disinfection",
      "Flush-mounted LED X-Ray viewers and illuminated medical gas alarm annunciator"
    ],
    'modular-clean-room-doors': [
      "Flush double-skin 45mm / 50mm door leaf with non-combustible PUF / honeycomb core",
      "Automatic drop-down bottom seal engaging when door closes to prevent air leakage",
      "Double-glazed toughened flush vision glass panels with built-in silica desiccant",
      "Heavy-duty SS 304 ball-bearing hinges with zero gap and sag-free durability",
      "Pre-wired for electromagnetic cleanroom interlocking and access control integration",
      "Concealed hydraulic overhead door closers and push-to-exit emergency release hardware"
    ],
    'cleanroom-turnkey-solution': [
      "End-to-end turnkey project execution: Concept, architectural layout, HVAC, and validation",
      "Custom Air Handling Units (AHUs), chillers, and dehumidifiers engineered in-house",
      "Turnkey ISO Class 4 to ISO Class 8 cleanrooms compliant with USFDA, cGMP, and EU GMP",
      "Modular PUF/Rockwool panels, walk-on ceilings, and heavy-duty antistatic epoxy flooring",
      "Installation of all terminal equipment: Air Showers, Pass Boxes, LAF, and Bio Safety Cabinets",
      "Comprehensive validation and documentation: DOP filter testing, particle counts, and airflow balancing"
    ],
    'other-products-laboratory-equipment': [
      "BOD Incubators: Precision temperature control from +5°C to 60°C for BOD determinations",
      "Stability Chambers: Controlled temperature and humidity testing complying with ICH guidelines",
      "Bacteriological Incubators: Ambient +5°C to 70°C incubation for microbiological analysis",
      "Hot Air Ovens: Forced air circulation ovens providing uniform dry heat sterilization up to 250°C",
      "Corrosion-resistant stainless steel SS 304 internal chambers with perforated trays",
      "Digital PID microprocessor controllers with dual LED display and over-temperature safety"
    ]
  };

  // Specific clean overviews for products where previous scrape had unwanted boilerplate
  const cleanOverviewMap = {
    'static-pass-box': "The Static Pass Box, fabricated with SS 304 or SS 316 grade stainless steel, is built for maximum durability and contamination control. Incorporating high-efficiency mechanical or electromagnetic interlocking and UV germicidal sterilization, it prevents cross-contamination between controlled areas during material transfer. It provides an essential, cGMP-compliant solution for maintaining cleanliness and hygiene across pharmaceutical, biotech, and semiconductor cleanrooms.",
    'hepa-terminal-box': "In pharmaceutical suites, research laboratories, and critical cleanrooms, terminal air filtration is vital for contamination control. Peter Air Systems engineers custom HEPA Filter Terminal Units (Clean Air Terminal Boxes) that house high-efficiency HEPA filters directly at the point of air supply. Each unit features built-in DOP/PAO test ports and differential pressure sampling nozzles, ensuring validated laminar air distribution into sterile environments.",
    'supply-return-air-grille': "Effective airflow management is crucial for maintaining indoor air quality and temperature uniformity in cleanrooms and commercial facilities. Peter Air Systems designs heavy-gauge aluminium and stainless steel Supply and Return Air Grilles equipped with adjustable aerofoil louvers and optional opposed blade dampers for precision airflow balance and minimal noise generation.",
    'supply-return-air-diffuser': "For an HVAC system to function efficiently, uniform multidirectional air distribution is essential. Peter Air Systems manufactures high-performance Supply and Return Air Diffusers in 1-way, 2-way, 3-way, and 4-way radial throw patterns. Engineered with removable inner cores for easy duct and damper maintenance, our diffusers ensure draught-free, uniform air coverage across cleanroom environments.",
    'modular-clean-room-doors': "Peter Air Systems is a premier manufacturer and supplier of modular cleanroom doors in India, offering high-performance hinged and sliding solutions for pharmaceutical, healthcare, biotechnology, and sterile packaging environments. Designed with flush smooth surfaces, automatic drop-down bottom seals, and double-glazed flush view panels, our doors ensure airtight seal integrity and effortless sanitization."
  };

  const updatedProducts = prods.map(p => {
    const page = rawPages.find(x => x.slug === p.slug);
    const content = page ? page.content.rendered : p.fullContent;

    // Extract Schema FAQs if present
    let schemaFaqs = [];
    if (content) {
      const scriptRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      let sm;
      while ((sm = scriptRegex.exec(content)) !== null) {
        try {
          const data = JSON.parse(sm[1]);
          const graph = data['@graph'] || [data];
          for (const item of graph) {
            if (item['@type'] === 'FAQPage' && item.mainEntity) {
              item.mainEntity.forEach(q => {
                const cleanQ = decodeHtmlEntities(stripHtmlToText(q.name));
                const cleanA = decodeHtmlEntities(stripHtmlToText(q.acceptedAnswer?.text || ''));
                if (cleanQ && cleanA && cleanQ.length < 150) {
                  schemaFaqs.push({ question: cleanQ, answer: cleanA });
                }
              });
            }
          }
        } catch(e) {}
      }
    }

    // Default FAQs for slugs without schema
    if (schemaFaqs.length === 0) {
      if (p.slug === 'air-washer-unit') {
        schemaFaqs = [
          {
            question: "What is an Air Washer Unit and how does it work?",
            answer: "An Air Washer Unit is an industrial evaporative cooling and air cleaning system that passes warm outdoor air through wetted cross-corrugated cellulose pads or high-pressure water spray banks. It lowers air temperature via adiabatic evaporation while filtering airborne dust and particulate contaminants."
          },
          {
            question: "What is the typical energy saving compared to conventional HVAC?",
            answer: "Air washer systems consume approximately 60% to 70% less electrical energy than conventional refrigeration-based DX cooling systems, making them exceptionally economical for large industrial workshops, warehouses, and clean environments."
          },
          {
            question: "Can Peter Air Systems customize air washer dimensions and CFM capacity?",
            answer: "Yes, our Air Washer Units are manufactured in custom capacities ranging from 2,000 CFM to 60,000 CFM, with casing options in pre-coated GI, extruded aluminium pentapost profile, or sanitary SS 304/SS 316."
          },
          {
            question: "What maintenance is required for industrial air washer units?",
            answer: "Routine maintenance involves periodic inspection and cleaning of pre-filters, flushing the stainless steel water sump, inspecting submersible pumps, and checking cellulose cooling pads for scale buildup."
          }
        ];
      } else if (p.slug === 'cleanroom-turnkey-solution') {
        schemaFaqs = [
          {
            question: "What is included in a Cleanroom Turnkey Solution from Peter Air Systems?",
            answer: "Our turnkey cleanroom solution includes complete architectural planning, modular wall and ceiling panels, airtight GMP doors, precision HVAC and AHU design, HEPA filtration, dynamic pressure balancing, epoxy flooring, cleanroom equipment installation, and comprehensive validation (DQ, IQ, OQ, PQ)."
          },
          {
            question: "Which cleanroom classifications do you engineer?",
            answer: "We engineer modular cleanrooms from ISO Class 4 (Class 10) and ISO Class 5 (Class 100) through ISO Class 8 (Class 100,000), fully compliant with USFDA, cGMP, WHO-GMP, and EU GMP regulatory requirements."
          },
          {
            question: "How long does a complete cleanroom project typically take?",
            answer: "Turnkey project timelines depend on facility area and complexity. Standard modular cleanroom suites are prefabricated at our Mumbai plant and typically installed, commissioned, and validated within 4 to 12 weeks."
          },
          {
            question: "Do you provide validation and testing documentation for audits?",
            answer: "Yes. Every turnkey installation includes comprehensive validation protocols and execution reports, including HEPA filter integrity (DOP/PAO testing), particle count validation, recovery rate tests, airflow velocity, and pressure differential cascade mapping."
          }
        ];
      }
    }

    const cleanedOverview = cleanOverviewMap[p.slug] || decodeHtmlEntities(p.overview || '');

    return {
      ...p,
      title: decodeHtmlEntities(p.title),
      h1: decodeHtmlEntities(p.h1 || p.title),
      seoTitle: decodeHtmlEntities(p.seoTitle),
      metaDescription: decodeHtmlEntities(p.metaDescription),
      categoryName: decodeHtmlEntities(p.categoryName),
      overview: cleanedOverview,
      features: featuresMap[p.slug] || p.features || [],
      faqs: schemaFaqs.length > 0 ? schemaFaqs : deepDecodeEntities(p.faqs || []),
      applications: (p.applications || []).map(a => decodeHtmlEntities(a)),
      materials: (p.materials || []).map(m => decodeHtmlEntities(m)),
    };
  });

  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'data', 'products.ts'),
    `export const products = ${JSON.stringify(updatedProducts, null, 2)};\n`
  );
  console.log('src/data/products.ts updated successfully with 26 clean products.');

  console.log('=== Step 2: Cleaning blogs.ts ===');
  let rawBlogs = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'blogs.ts'), 'utf8');
  rawBlogs = rawBlogs.replace(/^export const blogPosts\s*=\s*/, '').replace(/;\s*export default blogPosts;\s*$/, '');
  const blogs = JSON.parse(rawBlogs);

  const cleanedBlogs = blogs.map(b => ({
    ...b,
    title: decodeHtmlEntities(b.title),
    excerpt: decodeHtmlEntities(b.excerpt),
    author: decodeHtmlEntities(b.author || 'Peter Air Systems Engineering Team'),
    category: decodeHtmlEntities(b.category || 'Cleanroom Components'),
    categories: (b.categories || []).map(c => decodeHtmlEntities(c)),
    content: decodeHtmlEntities(b.content),
  }));

  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'data', 'blogs.ts'),
    `export const blogPosts = ${JSON.stringify(cleanedBlogs, null, 2)};\n\nexport default blogPosts;\n`
  );
  console.log(`src/data/blogs.ts updated successfully with ${cleanedBlogs.length} decoded blogs.`);

  console.log('=== Step 3: Cleaning categories.ts, industries.ts, services.ts, siteConfig.ts ===');
  const catPath = path.join(__dirname, '..', 'src', 'data', 'categories.ts');
  let rawCats = fs.readFileSync(catPath, 'utf8').replace(/^export const categories\s*=\s*/, '').replace(/;\s*$/, '');
  const cats = JSON.parse(rawCats);
  const cleanedCats = cats.map(c => ({
    ...c,
    name: decodeHtmlEntities(c.name),
    shortDescription: decodeHtmlEntities(c.shortDescription),
  }));
  fs.writeFileSync(catPath, `export const categories = ${JSON.stringify(cleanedCats, null, 2)};\n`);

  const indPath = path.join(__dirname, '..', 'src', 'data', 'industries.ts');
  let rawInds = fs.readFileSync(indPath, 'utf8').replace(/^export const industries\s*=\s*/, '').replace(/;\s*$/, '');
  const inds = JSON.parse(rawInds);
  const cleanedInds = inds.map(i => ({
    ...i,
    name: decodeHtmlEntities(i.name),
    tagline: decodeHtmlEntities(i.tagline),
    description: decodeHtmlEntities(i.description),
    challenges: (i.challenges || []).map(ch => decodeHtmlEntities(ch)),
    solutions: (i.solutions || []).map(s => decodeHtmlEntities(s)),
  }));
  fs.writeFileSync(indPath, `export const industries = ${JSON.stringify(cleanedInds, null, 2)};\n`);

  console.log('=== Step 4: Syncing Database (prisma/dev.db) ===');
  // 1. Sync Products in DB
  for (const p of updatedProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        seoTitle: p.seoTitle,
        metaDescription: p.metaDescription,
        h1: p.h1,
        overview: p.overview,
        features: JSON.stringify(p.features),
        faq: JSON.stringify(p.faqs),
        applications: JSON.stringify(p.applications),
      },
      create: {
        slug: p.slug,
        title: p.title,
        categorySlug: p.categorySlug || 'hvac-products',
        categoryName: p.categoryName || 'Air Handling & HVAC Systems',
        seoTitle: p.seoTitle,
        metaDescription: p.metaDescription,
        canonical: p.canonical || `https://peterairs.com/${p.slug}/`,
        h1: p.h1,
        image: p.image || '/images/AHU.jpeg',
        bannerImage: p.bannerImage || '/images/ahu_banner.png',
        overview: p.overview,
        fullContent: p.fullContent || '',
        features: JSON.stringify(p.features),
        faq: JSON.stringify(p.faqs),
        applications: JSON.stringify(p.applications),
        isPublished: true,
      }
    });
  }
  console.log(`Synced ${updatedProducts.length} products to database.`);

  // 2. Sync Blogs in DB
  for (const b of cleanedBlogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        author: b.author,
        seoTitle: `${b.title} | Peter Air Systems`,
        metaDescription: b.excerpt.slice(0, 160),
        imageAlt: b.title,
      },
      create: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        author: b.author,
        category: b.category,
        featuredImage: b.featuredImage || '/images/AHU.jpeg',
        imageAlt: b.title,
        tags: (b.categories || []).join(', '),
        isDraft: false,
        publishedAt: new Date(b.date || Date.now()),
        seoTitle: `${b.title} | Peter Air Systems`,
        metaDescription: b.excerpt.slice(0, 160),
        canonicalUrl: `https://peterairs.com/blog/${b.slug}/`,
        isBase: true,
      }
    });
  }
  console.log(`Synced ${cleanedBlogs.length} blogs to database.`);

  // 3. Clean Hero Slides in DB
  const heroSlides = await prisma.heroSlide.findMany();
  for (const slide of heroSlides) {
    await prisma.heroSlide.update({
      where: { id: slide.id },
      data: {
        badge: decodeHtmlEntities(slide.badge),
        heading: decodeHtmlEntities(slide.heading),
        highlightWord: decodeHtmlEntities(slide.highlightWord),
        supportingText: decodeHtmlEntities(slide.supportingText),
        primaryBtnText: decodeHtmlEntities(slide.primaryBtnText),
        secondaryBtnText: decodeHtmlEntities(slide.secondaryBtnText),
        technicalSpecs: decodeHtmlEntities(slide.technicalSpecs),
      }
    });
  }
  console.log(`Cleaned ${heroSlides.length} hero slides in database.`);

  // 4. Clean SiteContent in DB
  const siteContents = await prisma.siteContent.findMany();
  for (const sc of siteContents) {
    await prisma.siteContent.update({
      where: { id: sc.id },
      data: {
        value: decodeHtmlEntities(sc.value),
        label: decodeHtmlEntities(sc.label),
      }
    });
  }
  console.log(`Cleaned ${siteContents.length} site content items in database.`);

  console.log('=== All data cleaned and database synchronized successfully! ===');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
