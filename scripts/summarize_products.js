const fs = require('fs');

const pages = JSON.parse(fs.readFileSync('data/raw_pages.json', 'utf8'));

// List of product slugs
const productSlugs = [
  'air-handling-unit-ahu',
  'air-washer-unit',
  'dehumidifier-unit',
  'air-shower',
  'static-pass-box',
  'dynamic-pass-box',
  'bio-safety-cabinets',
  'laminar-work-stations',
  'dispensing-booth',
  'garment-cabinet',
  'reverse-laminar-flow-unit',
  'ceiling-suspended-laminar',
  'modular-clean-room-doors',
  'modular-ot',
  'enhance-air-quality-with-pre-filters',
  'fine-filter',
  'hepa-filter',
  'mini-pleat-hepa-filter',
  'hepa-terminal-box',
  'supply-return-air-grille',
  'supply-return-air-diffuser',
  'volume-control-damper-v-c-d',
  'return-air-riser',
  'cleanroom-turnkey-solution',
  'modular-cleanroom-solution',
  'air-filters',
  'hvac-products',
  'clean-room-equipment',
  'other-products-laboratory-equipment'
];

console.log(`Checking ${productSlugs.length} product & solution pages...`);

const productData = {};

for (const slug of productSlugs) {
  const p = pages.find(item => item.slug === slug);
  if (p) {
    const rawContent = p.content.rendered;
    // Extract tables if any
    const tables = [...rawContent.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)].map(m => m[0]);
    // Extract images
    const imgs = [...rawContent.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    // Strip tags for clean text preview
    const cleanText = rawContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    productData[slug] = {
      id: p.id,
      title: p.title.rendered,
      tableCount: tables.length,
      imageCount: imgs.length,
      images: imgs,
      textLength: cleanText.length,
      sampleText: cleanText.slice(0, 300)
    };
  } else {
    console.log('Not found in pages:', slug);
  }
}

fs.writeFileSync('data/products_summary.json', JSON.stringify(productData, null, 2));
console.log('Product summary generated.');
for (const [slug, info] of Object.entries(productData)) {
  console.log(`- ${slug}: ${info.title} (${info.textLength} chars, ${info.tableCount} tables, ${info.imageCount} imgs)`);
}
