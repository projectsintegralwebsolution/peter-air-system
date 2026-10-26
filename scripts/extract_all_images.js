const fs = require('fs');

const pages = JSON.parse(fs.readFileSync('data/raw_pages.json', 'utf8'));
const posts = JSON.parse(fs.readFileSync('data/raw_posts.json', 'utf8'));
const homeHtml = fs.readFileSync('data/home.html', 'utf8');

const imgSet = new Set();

function extractImgs(text) {
  if (!text) return;
  const matches = [...text.matchAll(/https?:\/\/[^\s"']+\.(?:png|jpg|jpeg|webp|svg)/gi)];
  matches.forEach(m => {
    let url = m[0].replace(/\\/g, '');
    if (url.includes('peterairs.com/wp-content/uploads/')) {
      imgSet.add(url);
    }
  });
}

extractImgs(homeHtml);
pages.forEach(p => extractImgs(p.content.rendered));
posts.forEach(p => extractImgs(p.content.rendered));

console.log(`Total unique Peter Air uploads found: ${imgSet.size}`);
const sorted = [...imgSet].sort();
fs.writeFileSync('data/image_urls.json', JSON.stringify(sorted, null, 2));

console.log('Sample images:');
sorted.slice(0, 25).forEach(img => console.log(' - ' + img));
