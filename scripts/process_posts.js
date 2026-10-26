const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('data/raw_posts.json', 'utf8'));
const categories = JSON.parse(fs.readFileSync('data/raw_categories.json', 'utf8'));
const catMap = {};
categories.forEach(c => catMap[c.id] = c.name);

const processedPosts = posts.map(p => {
  const imgMatches = [...p.content.rendered.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  const firstImg = imgMatches.length > 0 ? imgMatches[0][1] : null;

  return {
    id: p.id,
    slug: p.slug,
    title: p.title.rendered,
    date: p.date,
    categories: (p.categories || []).map(cid => catMap[cid] || 'Cleanroom & HVAC'),
    excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').replace(/For Enquiry Click Here/gi, '').trim(),
    content: p.content.rendered,
    featuredImage: firstImg || 'https://peterairs.com/wp-content/uploads/2026/03/AHU.jpeg'
  };
});

fs.writeFileSync('data/processed_posts.json', JSON.stringify(processedPosts, null, 2));
console.log(`Processed ${processedPosts.length} posts and saved to data/processed_posts.json`);
