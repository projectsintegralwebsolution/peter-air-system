const fs = require('fs');
const content = fs.readFileSync('src/data/blogs.ts', 'utf8');

const postRegex = /\{\s*"id":\s*(\d+),\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)"[\s\S]*?"content":\s*"([\s\S]*?)",\s*"featuredImage":\s*"([^"]+)"/g;

let match;
while ((match = postRegex.exec(content)) !== null) {
  if (match[2] === 'modular-ot-design-guide-everything-you-need-to-know-before-installation') {
    const rawHtml = JSON.parse('"' + match[4] + '"');
    const hs = rawHtml.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi);
    console.log("All headings:");
    hs.forEach(h => console.log(h));
    break;
  }
}
