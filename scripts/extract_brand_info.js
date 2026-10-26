const fs = require('fs');

const homeHtml = fs.readFileSync('data/home.html', 'utf8');
const contactPage = fs.existsSync('data/raw_pages.json') ? JSON.parse(fs.readFileSync('data/raw_pages.json', 'utf8')).find(p => p.slug === 'contact-peter-air-systems') : null;

console.log('--- CONTACT INFO DISCOVERY ---');
const phones = [...new Set(homeHtml.match(/(\+91[\d\s-]{10,15}|tel:[\d\+\s-]+)/g) || [])];
console.log('Phones in home:', phones);

const emails = [...new Set(homeHtml.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g) || [])];
console.log('Emails in home:', emails);

const wa = [...new Set(homeHtml.match(/(https?:\/\/(?:wa\.me|api\.whatsapp\.com)[^\s"\'<>]+)/g) || [])];
console.log('WhatsApp links in home:', wa);

if (contactPage) {
  console.log('\n--- CONTACT PAGE CONTENT ---');
  console.log(contactPage.content.rendered.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 1500));
}

// Find header/footer styles or color codes
const hexColors = homeHtml.match(/#[0-9a-fA-F]{6}\b/g) || [];
const colorCounts = {};
hexColors.forEach(c => {
  const lc = c.toLowerCase();
  colorCounts[lc] = (colorCounts[lc] || 0) + 1;
});
console.log('\n--- TOP BRAND / CSS COLORS ---');
console.log(Object.entries(colorCounts).sort((a,b) => b[1] - a[1]).slice(0, 15));

// Check logo
const logoMatches = homeHtml.match(/https?:\/\/[^\s"\'<>]*(?:logo|peter)[^\s"\'<>]*\.(?:png|jpg|jpeg|webp|svg)/gi) || [];
console.log('\n--- LOGO CANDIDATES ---');
console.log([...new Set(logoMatches)].slice(0, 10));
