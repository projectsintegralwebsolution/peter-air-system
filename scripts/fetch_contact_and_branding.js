const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

async function run() {
  const homeHtml = await fetch('https://peterairs.com/');
  fs.writeFileSync('data/home.html', homeHtml);
  
  const contactHtml = await fetch('https://peterairs.com/contact-peter-air-systems/');
  fs.writeFileSync('data/contact.html', contactHtml);

  console.log('Saved home.html (' + homeHtml.length + ' bytes) and contact.html (' + contactHtml.length + ' bytes)');

  // Contact info
  const combined = homeHtml + ' ' + contactHtml;
  const phones = [...new Set(combined.match(/(\+91[\d\s-]{9,15}|tel:[\d\+\s-]+|\b\d{10}\b)/g) || [])];
  console.log('Phones found:', phones);

  const emails = [...new Set(combined.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g) || [])];
  console.log('Emails found:', emails);

  const wa = [...new Set(combined.match(/(https?:\/\/(?:wa\.me|api\.whatsapp\.com)[^\s"\'<>]+)/g) || [])];
  console.log('WhatsApp found:', wa);

  // Address
  const addresses = [...new Set(combined.match(/([^\n<>]{10,150}(?:Bhiwandi|Thane|Mumbai|Maharashtra|Pincode|Pin Code)[^\n<>]{0,100})/gi) || [])];
  console.log('Address candidates:');
  addresses.slice(0, 10).forEach(a => console.log(' - ' + a.trim()));

  // Logos
  const logos = [...new Set(combined.match(/https?:\/\/[^\s"\'<>]*(?:logo|peter)[^\s"\'<>]*\.(?:png|jpg|jpeg|webp|svg)/gi) || [])];
  console.log('Logo candidates:');
  logos.forEach(l => console.log(' - ' + l));

  // Colors
  const hex = homeHtml.match(/#[0-9a-fA-F]{6}\b/g) || [];
  const cMap = {};
  hex.forEach(c => cMap[c.toLowerCase()] = (cMap[c.toLowerCase()] || 0) + 1);
  console.log('Top colors:');
  console.log(Object.entries(cMap).sort((a,b) => b[1] - a[1]).slice(0, 10));
}
run();
