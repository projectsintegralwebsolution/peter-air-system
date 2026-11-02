const zlib = require('zlib');
const fs = require('fs');

const buf = fs.readFileSync('public/images/PETER-AIR-LOGO.png');
// Find IDAT chunks
let idatBufs = [];
let pos = 8;
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.slice(pos + 4, pos + 8).toString('ascii');
  if (type === 'IDAT') {
    idatBufs.push(buf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}
const idat = Buffer.concat(idatBufs);
const uncompressed = zlib.inflateSync(idat);

// 70 width x 80 height, RGBA = 4 bytes per pixel + 1 filter byte per line = 70*4 + 1 = 281 bytes per line
console.log('Uncompressed length:', uncompressed.length, 'expected:', 80 * (70 * 4 + 1));

// Sample pixel at (0,0)
const r0 = uncompressed[1], g0 = uncompressed[2], b0 = uncompressed[3], a0 = uncompressed[4];
console.log('Pixel (0,0) RGBA:', r0, g0, b0, a0);

// Let's see how many transparent pixels exist
let transparentCount = 0;
let solidCount = 0;
for (let y = 0; y < 80; y++) {
  const rowStart = y * 281 + 1;
  for (let x = 0; x < 70; x++) {
    const a = uncompressed[rowStart + x * 4 + 3];
    if (a < 50) transparentCount++;
    else solidCount++;
  }
}
console.log('Transparent pixels:', transparentCount, 'Solid pixels:', solidCount);
