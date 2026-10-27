const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
  { url: 'https://peterairs.com/wp-content/uploads/2022/07/slider2.jpg', name: 'slider2.jpg' },
  { url: 'https://peterairs.com/wp-content/uploads/2022/07/slider3.jpg', name: 'slider3.jpg' }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join('public', 'images', item.name);
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          console.log(`Downloaded ${item.name} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      } else {
        console.log(`Failed ${item.name}: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', err => {
      console.log(`Error ${item.name}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of downloads) {
    await download(item);
  }
}
run();
