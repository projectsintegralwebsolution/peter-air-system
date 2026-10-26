const fs = require('fs');
const path = require('path');
const { decodeHtmlEntities, stripHtmlToText, deepDecodeEntities } = require('./textUtils');

const rawPages = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'raw_pages.json'), 'utf8'));

let rawProducts = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.ts'), 'utf8');
rawProducts = rawProducts.replace(/^export const products\s*=\s*/, '').replace(/;\s*$/, '');
const prods = JSON.parse(rawProducts);

const faqsBySlug = {};

prods.forEach(p => {
  const page = rawPages.find(x => x.slug === p.slug);
  if (!page) return;
  const content = page.content.rendered;
  const faqs = [];
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
            if (cleanQ && cleanA) {
              faqs.push({ question: cleanQ, answer: cleanA });
            }
          });
        }
      }
    } catch(e) {}
  }
  faqsBySlug[p.slug] = faqs;
});

// Provide fallback FAQs for air-washer-unit and cleanroom-turnkey-solution
faqsBySlug['air-washer-unit'] = [
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

faqsBySlug['cleanroom-turnkey-solution'] = [
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

console.log('Total slugs with FAQs:', Object.keys(faqsBySlug).length);
Object.entries(faqsBySlug).forEach(([slug, list]) => {
  console.log(`${slug}: ${list.length} clean FAQs`);
});
