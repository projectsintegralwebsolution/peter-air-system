const fs = require('fs');
const path = require('path');

const rawPages = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'raw_pages.json'), 'utf8'));

let rawProducts = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.ts'), 'utf8');
rawProducts = rawProducts.replace(/^export const products\s*=\s*/, '').replace(/;\s*$/, '');
const prods = JSON.parse(rawProducts);

const featureSummary = [];

prods.forEach(p => {
  const page = rawPages.find(x => x.slug === p.slug);
  if (!page) return;
  const content = page.content.rendered;
  
  // Look for features
  const lines = [];
  // Match bullet points or feature list items
  const liMatches = [...content.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(t => t.length > 15 && t.length < 180 && 
      !t.toLowerCase().includes('http') && 
      !t.toLowerCase().includes('air handling unit') &&
      !t.toLowerCase().includes('clean room equipment') &&
      !t.toLowerCase().includes('hvac products') &&
      !t.toLowerCase().includes('air filters') &&
      !t.toLowerCase().includes('terms of service') &&
      !t.toLowerCase().includes('privacy policy')
    );

  featureSummary.push({
    slug: p.slug,
    title: p.title,
    candidateFeaturesCount: liMatches.length,
    sample1: liMatches[0] || 'NONE',
    sample2: liMatches[1] || 'NONE'
  });
});

console.table(featureSummary);
