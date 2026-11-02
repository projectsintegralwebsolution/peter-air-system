const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Footer.tsx');
let code = fs.readFileSync(filePath, 'utf8');
code = code.replace(/&amp;/g, '&');
code = code.replace(/&#39;/g, "'");
fs.writeFileSync(filePath, code);
console.log('Footer.tsx updated.');
