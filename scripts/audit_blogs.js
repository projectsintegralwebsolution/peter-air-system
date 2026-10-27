const fs = require('fs');
const path = require('path');
const { decodeHtmlEntities } = require('./textUtils');

let txt = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'blogs.ts'), 'utf8');
txt = txt.replace(/^export const blogPosts\s*=\s*/, '').replace(/;\s*export default blogPosts;\s*$/, '');
const blogs = JSON.parse(txt);

console.log('Total blogs:', blogs.length);
let titleCount = 0;
let excerptCount = 0;

blogs.forEach(b => {
  if (/&[a-zA-Z0-9#]+;/.test(b.title)) {
    titleCount++;
    console.log('Title with entity:', b.title, '=>', decodeHtmlEntities(b.title));
  }
  if (/&[a-zA-Z0-9#]+;/.test(b.excerpt)) {
    excerptCount++;
  }
});

console.log('Titles with entities:', titleCount);
console.log('Excerpts with entities:', excerptCount);
