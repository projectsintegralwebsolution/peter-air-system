const fs = require('fs');

function decodeCfEmail(cfHex) {
  let r = parseInt(cfHex.substr(0, 2), 16);
  let email = '';
  for (let n = 2; n < cfHex.length; n += 2) {
    let c = parseInt(cfHex.substr(n, 2), 16) ^ r;
    email += String.fromCharCode(c);
  }
  return email;
}

const html = fs.readFileSync('data/contact.html', 'utf8');
const matches = [...html.matchAll(/data-cfemail=["']([a-fA-F0-9]+)["']/g)];
console.log('CF email matches:', matches.length);
matches.forEach(m => {
  console.log('Decoded email:', decodeCfEmail(m[1]));
});
