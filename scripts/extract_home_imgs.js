const fs = require('fs');
const homeHtml = fs.readFileSync('data/home.html', 'utf8');

const matches = [...homeHtml.matchAll(/https?:\/\/[^\s"']+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]);
console.log('Total URLs found in homeHtml:', matches.length);
const unique = [...new Set(matches)];
console.log('Unique image URLs in homeHtml:');
unique.slice(0, 30).forEach(u => console.log(' - ' + u));
