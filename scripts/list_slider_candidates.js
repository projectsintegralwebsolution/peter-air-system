const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'images');
const files = fs.readdirSync(imgDir);

const candidates = files.filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !f.includes('logo') && !f.includes('icon');
});

const withStats = candidates.map(f => {
  const stat = fs.statSync(path.join(imgDir, f));
  return { name: f, size: stat.size };
}).sort((a,b) => b.size - a.size);

console.log('Top 40 image files by size in public/images:');
withStats.slice(0, 40).forEach(c => console.log(` - ${c.name} (${Math.round(c.size / 1024)} KB)`));
