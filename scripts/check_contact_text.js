const fs = require('fs');
const html = fs.readFileSync('data/contact.html', 'utf8');
const text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                 .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                 .replace(/<[^>]+>/g, ' ')
                 .replace(/\s+/g, ' ');

console.log('Contact page text excerpt:');
console.log(text.slice(0, 3000));

// Find any email format
const emails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g);
console.log('Emails found in contact text:', emails);
