const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('data/raw_posts.json', 'utf8'));
console.log(`Total posts: ${posts.length}`);

const sample = posts.slice(0, 5).map(p => ({
  id: p.id,
  slug: p.slug,
  title: p.title.rendered,
  date: p.date,
  categories: p.categories,
  featured_media: p.featured_media,
  excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').trim().slice(0, 100)
}));
console.log('Sample posts:', JSON.stringify(sample, null, 2));

// Check media/featured images in posts
const withMedia = posts.filter(p => p.featured_media > 0);
console.log(`Posts with featured_media: ${withMedia.length} / ${posts.length}`);
