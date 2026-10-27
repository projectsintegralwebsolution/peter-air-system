const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await fetch('https://articaer.com/');
    fs.writeFileSync('data/articaer.html', html);
    console.log('Articaer html saved, len:', html.length);

    // Extract headers/structure
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const navs = [...html.matchAll(/<nav[^>]*>([\s\S]*?)<\/nav>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

    console.log('Articaer H1s:', h1s);
    console.log('Articaer H2s:', h2s);
    console.log('Articaer Nav:', navs.slice(0, 2));
  } catch (e) {
    console.log('Error inspecting articaer:', e.message);
  }
}
run();
