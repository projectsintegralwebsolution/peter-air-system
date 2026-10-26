const fs = require('fs');
const path = require('path');
const { decodeHtmlEntities, stripHtmlToText } = require('./textUtils');

let rawProducts = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.ts'), 'utf8');
rawProducts = rawProducts.replace(/^export const products\s*=\s*/, '').replace(/;\s*$/, '');
const prods = JSON.parse(rawProducts);

prods.forEach(p => {
  let overview = p.overview || '';
  // Check if overview has raw HTML tags
  if (/<[^>]+>/.test(overview)) {
    overview = stripHtmlToText(overview);
  } else {
    overview = decodeHtmlEntities(overview);
  }

  // Check if it ends mid-sentence or with "Step 1: Material Placement..."
  if (p.slug === 'static-pass-box') {
    overview = "The Static Pass Box, fabricated with SS 304 or SS 316 grade stainless steel, is built for maximum durability and contamination control. Incorporating high-efficiency mechanical or electromagnetic interlocking and UV germicidal sterilization, it prevents cross-contamination between controlled areas during material transfer. It provides an essential, cGMP-compliant solution for maintaining cleanliness and hygiene across pharmaceutical, biotech, and semiconductor cleanrooms.";
  }

  console.log(`\n=== ${p.slug} Overview ===`);
  console.log(overview.slice(0, 200) + '...');
});
