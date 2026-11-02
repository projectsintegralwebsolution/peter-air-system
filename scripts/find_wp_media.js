const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

async function run() {
  for (let page = 1; page <= 3; page++) {
    try {
      const media = await fetch(`https://peterairs.com/wp-json/wp/v2/media?per_page=100&page=${page}`);
      if (!Array.isArray(media) || media.length === 0) break;
      console.log(`Page ${page}: ${media.length} items`);
      media.forEach(m => {
        const details = m.media_details || {};
        if (details.width >= 1000) {
          console.log(`- ${m.title.rendered} [${details.width}x${details.height}] -> ${m.source_url}`);
        }
      });
    } catch(e) {
      console.log('Done at page', page);
      break;
    }
  }
}

run();
