const fs = require('fs');
const zlib = require('zlib');

function decodePNG(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 8;
  let width, height, colorType;
  const idatChunks = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.slice(pos + 4, pos + 8).toString('ascii');
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
      colorType = buf[pos + 17];
    } else if (type === 'IDAT') {
      idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }

  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = colorType === 6 ? 4 : 3;
  const stride = width * bpp;
  const pixels = Buffer.alloc(width * height * 4);

  let rawPos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rawPos++];
    const lineStart = y * width * 4;
    for (let x = 0; x < width; x++) {
      for (let c = 0; c < bpp; c++) {
        let val = raw[rawPos++];
        let a = x > 0 ? pixels[lineStart + (x - 1) * 4 + c] : 0;
        let b = y > 0 ? pixels[(y - 1) * width * 4 + x * 4 + c] : 0;
        let c_prev = (x > 0 && y > 0) ? pixels[(y - 1) * width * 4 + (x - 1) * 4 + c] : 0;

        if (filter === 1) { // Sub
          val = (val + a) & 0xff;
        } else if (filter === 2) { // Up
          val = (val + b) & 0xff;
        } else if (filter === 3) { // Average
          val = (val + Math.floor((a + b) / 2)) & 0xff;
        } else if (filter === 4) { // Paeth
          const p = a + b - c_prev;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c_prev);
          let pr = a;
          if (pb < pa && pb < pc) pr = b;
          else if (pc < pa) pr = c_prev;
          val = (val + pr) & 0xff;
        }
        pixels[lineStart + x * 4 + c] = val;
      }
      if (bpp === 3) {
        pixels[lineStart + x * 4 + 3] = 255;
      }
    }
  }

  return { width, height, pixels };
}

const { width, height, pixels } = decodePNG('public/images/PETER-AIR-LOGO.png');
console.log('Decoded dimensions:', width, height);
// Check corner pixels (0,0), (69,0), (0,79), (69,79)
const corners = [
  { x: 0, y: 0 },
  { x: width - 1, y: 0 },
  { x: 0, y: height - 1 },
  { x: width - 1, y: height - 1 },
];
corners.forEach(pt => {
  const idx = (pt.y * width + pt.x) * 4;
  console.log(`Corner (${pt.x}, ${pt.y}) RGBA:`, pixels[idx], pixels[idx+1], pixels[idx+2], pixels[idx+3]);
});

// Check min and max bounding box of non-transparent / non-white pixels
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2], a = pixels[idx+3];
    // if not transparent
    if (a > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log('Bounding box of visible pixels: X:', minX, 'to', maxX, 'Y:', minY, 'to', maxY);
console.log('Content width:', maxX - minX + 1, 'Content height:', maxY - minY + 1);
