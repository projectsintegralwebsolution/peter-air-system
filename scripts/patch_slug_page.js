const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'app', '[slug]', 'page.tsx');
let code = fs.readFileSync(targetPath, 'utf8');

// Add decodeHtmlEntities import
if (!code.includes('decodeHtmlEntities')) {
  code = code.replace(
    'import { getProductBySlug, getProductCategoryBySlug, getAllProducts } from "@/lib/db";',
    'import { getProductBySlug, getProductCategoryBySlug, getAllProducts } from "@/lib/db";\nimport { decodeHtmlEntities } from "@/lib/textUtils";'
  );
}

// Replace literal &amp; in JSX text
code = code.replace(/ISO &amp; CE VERIFIED/g, 'ISO & CE VERIFIED');
code = code.replace(/GMP &amp; Schedule M Compliant/g, 'GMP & Schedule M Compliant');
code = code.replace(/Technical Specifications &amp; Dimension Matrix/g, 'Technical Specifications & Dimension Matrix');
code = code.replace(/Applications &amp; Cleanroom Sectors/g, 'Applications & Cleanroom Sectors');
code = code.replace(/Related Cleanroom &amp; HVAC Equipment/g, 'Related Cleanroom & HVAC Equipment');
code = code.replace(/Available Models &amp; Equipment/g, 'Available Models & Equipment');
code = code.replace(/High-Integrity Cleanroom &amp; HVAC Manufacturing in Mumbai/g, 'High-Integrity Cleanroom & HVAC Manufacturing in Mumbai');
code = code.replace(/Manufacturing Infrastructure &amp; Technical Capabilities/g, 'Manufacturing Infrastructure & Technical Capabilities');
code = code.replace(/Testing &amp; Validation Bay/g, 'Testing & Validation Bay');
code = code.replace(/Comprehensive Engineering &amp; Validation Services/g, 'Comprehensive Engineering & Validation Services');
code = code.replace(/Testing &amp; Factory Acceptance \(FAT\) Standards/g, 'Testing & Factory Acceptance (FAT) Standards');
code = code.replace(/Air Velocity &amp; Uniformity/g, 'Air Velocity & Uniformity');
code = code.replace(/Static Pressure &amp; Leakage/g, 'Static Pressure & Leakage');
code = code.replace(/FACTORY &amp; CORPORATE OFFICE/g, 'FACTORY & CORPORATE OFFICE');
code = code.replace(/Works &amp; Office Address:/g, 'Works & Office Address:');

// Table wrapper
code = code.replace(
  'className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm"',
  'className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm product-table-wrapper"'
);
code = code.replace(
  'dangerouslySetInnerHTML={{ __html: tableHtml }}',
  'dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(tableHtml) }}'
);

// Decode entities for features, apps, faqs
code = code.replace(
  '{product.features.map((feat, idx) => (',
  '{product.features.map((feat, idx) => {\n                      const cleanFeat = decodeHtmlEntities(feat); return ('
);
code = code.replace(
  '<span className="text-xs sm:text-sm text-slate-700">{feat}</span>',
  '<span className="text-xs sm:text-sm text-slate-700">{cleanFeat}</span>'
);

code = code.replace(
  '{product.applications.map((app: string, idx: number) => (',
  '{product.applications.map((app: string, idx: number) => {\n                      const cleanApp = decodeHtmlEntities(app); return ('
);
code = code.replace(
  '• {app}',
  '• {cleanApp}'
);

code = code.replace(
  '<h4 className="font-bold text-slate-900 text-sm mb-2">\n                          {faq.question}\n                        </h4>',
  '<h4 className="font-bold text-slate-900 text-sm mb-2">\n                          {decodeHtmlEntities(faq.question)}\n                        </h4>'
);
code = code.replace(
  '<p className="text-xs sm:text-sm text-slate-600 leading-relaxed">\n                          {faq.answer}\n                        </p>',
  '<p className="text-xs sm:text-sm text-slate-600 leading-relaxed">\n                          {decodeHtmlEntities(faq.answer)}\n                        </p>'
);

// Materials decode
code = code.replace(
  '<p className="text-xs text-slate-600">{mat}</p>',
  '<p className="text-xs text-slate-600">{decodeHtmlEntities(mat)}</p>'
);

fs.writeFileSync(targetPath, code);
console.log('src/app/[slug]/page.tsx updated.');
