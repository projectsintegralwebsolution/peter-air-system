const fs = require('fs');
// Let's decode PNG chunks to see if it has alpha channel (color type 6 or 4 or tRNS)
const buf = fs.readFileSync('public/images/PETER-AIR-LOGO.png');
const colorType = buf[25];
console.log('PNG Color Type:', colorType, '(3=Indexed, 2=RGB, 6=RGBA, 4=Grayscale+Alpha, 0=Grayscale)');
