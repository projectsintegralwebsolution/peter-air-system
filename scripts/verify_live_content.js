const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function verifyPages() {
  const urls = [
    'http://localhost:3006/',
    'http://localhost:3006/static-pass-box/',
    'http://localhost:3006/modular-clean-room-doors/',
    'http://localhost:3006/air-handling-unit-ahu/',
    'http://localhost:3006/hepa-filter/',
    'http://localhost:3006/clean-room-equipment/',
    'http://localhost:3006/blog/',
    'http://localhost:3006/blog/laminar-flow-bench-vs-laminar-flow-hood-whats-the-difference/',
    'http://localhost:3006/contact-peter-air-systems/',
    'http://localhost:3006/services/',
  ];

  console.log('Testing live pages on http://localhost:3006 ...\n');

  for (const url of urls) {
    try {
      const res = await fetchUrl(url);
      const html = res.body;

      // Check for raw HTML entities rendered in visible text
      // (excluding script/style tags if any)
      const bodyWithoutScripts = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

      // Check problematic patterns
      const rawEntities = bodyWithoutScripts.match(/&(?:amp|#8217|#8211|#8220|#8221|#038|hellip);/g) || [];
      const hasMashedStaticPassBox = bodyWithoutScripts.includes('Industries Using Static Pass BoxesStatic Pass Boxes');
      const hasMashedPharma = bodyWithoutScripts.includes('Pharmaceutical Manufacturing PlantsBiotechnology');

      console.log(`URL: ${url}`);
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  Raw Entities Count: ${rawEntities.length} ${rawEntities.length > 0 ? JSON.stringify(rawEntities.slice(0, 5)) : ''}`);
      console.log(`  Mashed Static Pass Box error: ${hasMashedStaticPassBox ? 'FAILED' : 'PASSED (None)'}`);
      console.log(`  Mashed Pharma list error: ${hasMashedPharma ? 'FAILED' : 'PASSED (None)'}`);
      
      if (url.includes('static-pass-box')) {
        const hasFaqSection = bodyWithoutScripts.includes('Frequently Asked Technical Questions');
        const hasKeyFeatures = bodyWithoutScripts.includes('Key Engineering Features');
        console.log(`  Static Pass Box has FAQ Section: ${hasFaqSection}`);
        console.log(`  Static Pass Box has Key Features: ${hasKeyFeatures}`);
      }
      console.log('---');
    } catch (err) {
      console.error(`Failed to fetch ${url}:`, err.message);
    }
  }
}

verifyPages();
