const fs = require('fs');
const path = require('path');
const { decodeHtmlEntities } = require('./textUtils');

// 1. Decode tables, paragraphs in products.ts
const prodPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let raw = fs.readFileSync(prodPath, 'utf8').replace(/^export const products\s*=\s*/, '').replace(/;\s*$/, '');
const prods = JSON.parse(raw);

const cleanedProds = prods.map(p => {
  return {
    ...p,
    tables: (p.tables || []).map(t => decodeHtmlEntities(t)),
    paragraphs: (p.paragraphs || []).map(para => decodeHtmlEntities(para)),
    fullContent: decodeHtmlEntities(p.fullContent || ''),
  };
});

fs.writeFileSync(prodPath, `export const products = ${JSON.stringify(cleanedProds, null, 2)};\n`);
console.log('products.ts tables and fullContent decoded.');

// 2. Replace &copy; in Footer.tsx
const footerPath = path.join(__dirname, '..', 'src', 'components', 'Footer.tsx');
let footerCode = fs.readFileSync(footerPath, 'utf8');
footerCode = footerCode.replace(/&copy;/g, '©');
fs.writeFileSync(footerPath, footerCode);
console.log('Footer.tsx &copy; replaced.');

// 3. Replace &rarr; in Header.tsx
const headerPath = path.join(__dirname, '..', 'src', 'components', 'Header.tsx');
let headerCode = fs.readFileSync(headerPath, 'utf8');
headerCode = headerCode.replace(/&rarr;/g, '→');
fs.writeFileSync(headerPath, headerCode);
console.log('Header.tsx &rarr; replaced.');
