const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'src/app/industries/[slug]/page.tsx',
  'src/app/other-products-laboratory-equipment/page.tsx',
  'src/app/search/page.tsx',
  'src/components/BlogConsultationCard.tsx'
];

filesToPatch.forEach(relPath => {
  const filePath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');
  const count = (code.match(/&[a-zA-Z0-9#]+;/g) || []).length;
  console.log(relPath, 'entities count:', count);
  code = code.replace(/&amp;/g, '&');
  code = code.replace(/&rarr;/g, '→');
  code = code.replace(/&larr;/g, '←');
  fs.writeFileSync(filePath, code);
  console.log(relPath, 'cleaned.');
});
