const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      // Follow 301/302 redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = u.origin + redirectUrl;
        }
        fetchHtml(redirectUrl).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, statusCode: res.statusCode, html: data }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.abort();
      reject(new Error('Timeout ' + url));
    });
  });
}

function parsePage(url, html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '';

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i) ||
                        html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);

  const schemas = [];
  const schemaRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let sm;
  while ((sm = schemaRegex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(sm[1]));
    } catch (e) {
      schemas.push(sm[1].trim());
    }
  }

  // Extract images
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let im;
  while ((im = imgRegex.exec(html)) !== null) {
    const fullTag = im[0];
    const src = im[1];
    const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    images.push({ src, alt });
  }

  return {
    url,
    title,
    metaDescription,
    canonical,
    h1: h1Matches,
    h2: h2Matches,
    schemas,
    images: images.slice(0, 30) // limit sample
  };
}

async function run() {
  if (!fs.existsSync('data')) fs.mkdirSync('data');

  console.log('Auditing Homepage...');
  const homeRes = await fetchHtml('https://peterairs.com/');
  const homeParsed = parsePage('https://peterairs.com/', homeRes.html);
  fs.writeFileSync('data/home_audit.json', JSON.stringify(homeParsed, null, 2));
  console.log('Home audit complete.');
  console.log('Title:', homeParsed.title);
  console.log('Desc:', homeParsed.metaDescription);
  console.log('H1:', homeParsed.h1);

  // Now audit all 40 pages
  const rawPages = JSON.parse(fs.readFileSync('data/raw_pages.json', 'utf8'));
  console.log(`Auditing ${rawPages.length} pages...`);
  const results = [];
  for (const page of rawPages) {
    try {
      console.log(`Fetching ${page.link}...`);
      const res = await fetchHtml(page.link);
      const parsed = parsePage(page.link, res.html);
      parsed.slug = page.slug;
      parsed.wpTitle = page.title.rendered;
      parsed.wpId = page.id;
      results.push(parsed);
    } catch (e) {
      console.error(`Failed ${page.link}:`, e.message);
      results.push({
        url: page.link,
        slug: page.slug,
        wpTitle: page.title.rendered,
        wpId: page.id,
        error: e.message
      });
    }
  }

  fs.writeFileSync('data/all_pages_audit.json', JSON.stringify(results, null, 2));
  console.log('Finished auditing all pages! Saved to data/all_pages_audit.json');
}

run();
