const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://peterairs.com/wp-content/uploads/cleanroom-furniture-guide.jpg',
  'https://peterairs.com/wp-content/uploads/hvac-cleanroom-products.jpg',
  'https://peterairs.com/wp-content/uploads/modular-cleanroom-guide.jpg',
  'https://peterairs.com/wp-content/uploads/modular-cleanroom-vs-conventional-cleanroom.jpg',
  'https://peterairs.com/wp-content/uploads/puf-insulated-panels-cleanroom.jpg',
  'https://peterairs.com/wp-content/uploads/modular-ot-design-guide.jpg',
  'https://peterairs.com/wp-content/uploads/2026/03/OT.jpg'
];

function download(url) {
  return new Promise((resolve) => {
    const filename = path.basename(url);
    const dest = path.join('public', 'images', filename);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => resolve({ file: filename, ok: true, size: fs.statSync(dest).size }));
      } else {
        resolve({ file: filename, ok: false, status: res.statusCode });
      }
    });
    req.on('error', () => resolve({ file: filename, ok: false }));
  });
}

async function run() {
  for (const u of urls) {
    const res = await download(u);
    console.log(res);
  }
}
run();
