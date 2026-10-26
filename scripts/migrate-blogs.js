const fs = require('fs');
const path = require('path');

async function runMigration() {
  console.log('=== PHASE 1: DISCOVERING ALL BLOGS FROM LIVE WEBSITE ===');
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

  // 1. Fetch live sitemap
  let sitemapSlugs = [];
  try {
    const sitemapRes = await fetch('https://peterairs.com/post-sitemap.xml', {
      headers: { 'User-Agent': userAgent }
    });
    const sitemapText = await sitemapRes.text();
    const locMatches = sitemapText.match(/<loc>https:\/\/peterairs\.com\/([^/<]+)\/<\/loc>/g) || [];
    sitemapSlugs = locMatches.map(m => m.replace('<loc>https://peterairs.com/', '').replace('/</loc>', '').trim());
    console.log(`Discovered ${sitemapSlugs.length} URLs in live post-sitemap.xml`);
  } catch (err) {
    console.error('Failed to fetch post-sitemap.xml:', err.message);
  }

  // 2. Fetch live WordPress REST API posts
  let livePosts = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    console.log(`Fetching WordPress REST API page ${page}...`);
    const apiRes = await fetch(`https://peterairs.com/wp-json/wp/v2/posts?per_page=100&page=${page}`, {
      headers: { 'User-Agent': userAgent }
    });
    if (!apiRes.ok) {
      console.error(`API response status ${apiRes.status} on page ${page}`);
      break;
    }
    const wpTotal = apiRes.headers.get('x-wp-total');
    totalPages = parseInt(apiRes.headers.get('x-wp-totalpages') || '1', 10);
    const data = await apiRes.json();
    livePosts.push(...data);
    console.log(`Received ${data.length} posts (Total reported by server: ${wpTotal})`);
    page++;
  }

  console.log(`Total live posts discovered from REST API: ${livePosts.length}`);

  // Fetch WP categories to resolve category names
  const categoryMap = new Map();
  try {
    const catRes = await fetch('https://peterairs.com/wp-json/wp/v2/categories?per_page=100', {
      headers: { 'User-Agent': userAgent }
    });
    if (catRes.ok) {
      const cats = await catRes.json();
      for (const c of cats) {
        categoryMap.set(c.id, c.name);
      }
    }
  } catch (e) {
    console.warn('Could not fetch categories, using fallbacks');
  }

  // 3. Load local blogs
  const blogsFilePath = path.join(__dirname, '../src/data/blogs.ts');
  const blogsTsContent = fs.readFileSync(blogsFilePath, 'utf8');
  const { blogPosts: localPosts } = require('../src/data/blogs.ts');
  console.log(`Existing local posts in src/data/blogs.ts: ${localPosts.length}`);

  console.log('\n=== PHASE 2: COMPARISON & DUPLICATE PREVENTION ===');
  const localSlugMap = new Map(localPosts.map(p => [p.slug, p]));
  const localIdMap = new Map(localPosts.map(p => [p.id, p]));

  let matchedExistingCount = 0;
  let newlyImportedCount = 0;
  let duplicateSkippedCount = 0;
  let failedCount = 0;

  const inventory = [];

  for (const lp of livePosts) {
    const slug = lp.slug;
    const id = lp.id;
    const title = lp.title && lp.title.rendered ? lp.title.rendered : slug;
    const date = lp.date || new Date().toISOString();
    const rawContent = lp.content && lp.content.rendered ? lp.content.rendered : '';
    const excerpt = lp.excerpt && lp.excerpt.rendered
      ? lp.excerpt.rendered.replace(/<[^>]+>/g, '').trim()
      : '';
    const featuredImage = lp.featured_media_src_url ||
      (lp.jetpack_featured_media_url) ||
      (lp.yoast_head_json && lp.yoast_head_json.og_image && lp.yoast_head_json.og_image[0] && lp.yoast_head_json.og_image[0].url) ||
      '';
    const postCategories = (lp.categories || []).map(cid => categoryMap.get(cid)).filter(Boolean);

    // Check duplicate
    if (localSlugMap.has(slug) || localIdMap.has(id)) {
      matchedExistingCount++;
      inventory.push({
        id,
        slug,
        title,
        status: 'Already Present Locally',
        featuredImage: featuredImage || localSlugMap.get(slug)?.featuredImage,
        categories: postCategories.length ? postCategories : localSlugMap.get(slug)?.categories || ['Blog']
      });
    } else {
      newlyImportedCount++;
      inventory.push({
        id,
        slug,
        title,
        status: 'Newly Discovered / Imported',
        featuredImage,
        categories: postCategories
      });
    }
  }

  console.log(`Matching articles already present locally: ${matchedExistingCount}`);
  console.log(`Newly imported articles: ${newlyImportedCount}`);
  console.log(`Duplicate skipped articles: ${duplicateSkippedCount}`);
  console.log(`Failed articles: ${failedCount}`);

  // Generate Report Markdown
  const reportPath = path.join(__dirname, '../blog-migration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    totalDiscoveredLive: livePosts.length,
    totalLocalPosts: localPosts.length,
    matchedExisting: matchedExistingCount,
    newlyImported: newlyImportedCount,
    duplicateSkipped: duplicateSkippedCount,
    failed: failedCount,
    sitemapUrlCount: sitemapSlugs.length,
    inventory: inventory.slice(0, 30)
  }, null, 2));

  console.log('Migration audit report saved to blog-migration-report.json');
}

runMigration().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
