const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let code = fs.readFileSync(filePath, 'utf8');
const count = (code.match(/&amp;/g) || []).length;
console.log('src/app/page.tsx &amp; count:', count);
code = code.replace(/&amp;/g, '&');
fs.writeFileSync(filePath, code);
console.log('src/app/page.tsx updated.');
