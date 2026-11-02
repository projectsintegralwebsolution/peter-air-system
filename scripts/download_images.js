const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const imagesToDownload = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'image_urls.json'), 'utf8'));

// Filter out thumbnails (-300x..., -150x..., -100x...) unless that's the only one
const nonThumb = imagesToDownload.filter(url => !url.match(/-\d+x\d+\.(?:png|jpg|jpeg|webp)/i));
console.log(`Downloading ${nonThumb.length} full-resolution images...`);

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      return resolve(true); // already downloaded
    }
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return resolve(false);
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });
      fileStream.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });
    req.on('error', reject);
    req.setTimeout(20000, () => {
      req.abort();
      resolve(false);
    });
  });
}

async function run() {
  let success = 0;
  for (let i = 0; i < nonThumb.length; i++) {
    const url = nonThumb[i];
    const filename = path.basename(url);
    const dest = path.join(targetDir, filename);
    try {
      const ok = await downloadFile(url, dest);
      if (ok) success++;
      if (i % 10 === 0) console.log(`Progress: ${i+1}/${nonThumb.length} downloaded (${success} successful)`);
    } catch (e) {
      console.log(`Failed to download ${url}: ${e.message}`);
    }
  }
  console.log(`Finished downloading ${success} / ${nonThumb.length} images to public/images/`);
}

run();
