const fs = require('fs');
const path = require('path');

// 1. Patch src/app/blog/page.tsx
const blogPagePath = path.join(__dirname, '..', 'src', 'app', 'blog', 'page.tsx');
let blogPage = fs.readFileSync(blogPagePath, 'utf8');

if (!blogPage.includes('decodeHtmlEntities')) {
  blogPage = blogPage.replace(
    'import { blogPosts } from "@/data/blogs";',
    'import { blogPosts } from "@/data/blogs";\nimport { decodeHtmlEntities } from "@/lib/textUtils";'
  );
}

blogPage = blogPage.replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”');

blogPage = blogPage.replace(
  '<Link href={`/blog/${featuredPost.slug}/`}>{featuredPost.title}</Link>',
  '<Link href={`/blog/${featuredPost.slug}/`}>{decodeHtmlEntities(featuredPost.title)}</Link>'
);
blogPage = blogPage.replace(
  '{featuredPost.excerpt}',
  '{decodeHtmlEntities(featuredPost.excerpt)}'
);

blogPage = blogPage.replace(
  '<Link href={`/blog/${post.slug}/`}>{post.title}</Link>',
  '<Link href={`/blog/${post.slug}/`}>{decodeHtmlEntities(post.title)}</Link>'
);
blogPage = blogPage.replace(
  '{post.excerpt}',
  '{decodeHtmlEntities(post.excerpt)}'
);

fs.writeFileSync(blogPagePath, blogPage);
console.log('src/app/blog/page.tsx updated.');

// 2. Patch src/app/blog/[slug]/page.tsx
const blogSlugPath = path.join(__dirname, '..', 'src', 'app', 'blog', '[slug]', 'page.tsx');
let blogSlug = fs.readFileSync(blogSlugPath, 'utf8');

if (!blogSlug.includes('decodeHtmlEntities')) {
  blogSlug = blogSlug.replace(
    'import { blogPosts } from "@/data/blogs";',
    'import { blogPosts } from "@/data/blogs";\nimport { decodeHtmlEntities } from "@/lib/textUtils";'
  );
}

blogSlug = blogSlug.replace(/&amp;/g, '&');

blogSlug = blogSlug.replace(
  'const cleanText = text.replace(/<[^>]+>/g, "").trim();',
  'const cleanText = decodeHtmlEntities(text.replace(/<[^>]+>/g, "").trim());'
);

blogSlug = blogSlug.replace(
  'const text = m[2].replace(/<[^>]+>/g, "").trim();',
  'const text = decodeHtmlEntities(m[2].replace(/<[^>]+>/g, "").trim());'
);

blogSlug = blogSlug.replace(
  'title={post.title}',
  'title={decodeHtmlEntities(post.title)}'
);
blogSlug = blogSlug.replace(
  'subtitle={post.excerpt}',
  'subtitle={decodeHtmlEntities(post.excerpt)}'
);
blogSlug = blogSlug.replace(
  '{ label: post.title }',
  '{ label: decodeHtmlEntities(post.title) }'
);
blogSlug = blogSlug.replace(
  '<span>{post.categories[0] || "Cleanroom Engineering"}</span>',
  '<span>{decodeHtmlEntities(post.categories[0] || "Cleanroom Engineering")}</span>'
);

fs.writeFileSync(blogSlugPath, blogSlug);
console.log('src/app/blog/[slug]/page.tsx updated.');
