const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('data/all_pages_audit.json', 'utf8'));

console.log(`Total audited pages: ${audit.length}`);
console.log('\n--- SEO BASELINE SUMMARY ---');

const summary = audit.map(p => ({
  slug: p.slug,
  url: p.url,
  title: p.title,
  metaDescription: p.metaDescription,
  canonical: p.canonical,
  h1: p.h1,
  h2Count: p.h2 ? p.h2.length : 0,
  schemaCount: p.schemas ? p.schemas.length : 0
}));

fs.writeFileSync('data/seo_baseline.json', JSON.stringify(summary, null, 2));

summary.forEach((s, i) => {
  console.log(`[${i+1}] Slug: /${s.slug}/`);
  console.log(`    Title: ${s.title}`);
  console.log(`    H1: ${s.h1 && s.h1.length ? s.h1.join(' | ') : 'NONE'}`);
  console.log(`    Canonical: ${s.canonical}`);
  console.log(`    Desc: ${s.metaDescription ? s.metaDescription.slice(0, 80) + '...' : 'EMPTY'}`);
  console.log('---');
});
