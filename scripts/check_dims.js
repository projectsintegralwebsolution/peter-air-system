const fs = require('fs');
const path = require('path');

function getDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (filePath.endsWith('.png')) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xFF) break;
      const marker = buffer[offset + 1];
      if (marker === 0xC0 || marker === 0xC2) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      const len = buffer.readUInt16BE(offset + 2);
      offset += 2 + len;
    }
  }
  return { width: 0, height: 0 };
}

const testFiles = [
  '1-1.png',
  'slider1.jpg',
  'clean-room-equipmrnt.jpg',
  'MODULAR-CLEAN-ROOM-HVAC-DUCTING.jpg',
  'MODULAR-CLEAN-ROOM-VALIDATION-MAINTENANCE.jpg',
  'interior-view-operating-room-generative-ai_587448-18.jpg',
  'MODULAR-CLEAN-ROOM-EPOXY-FLOORING-PAINTING.jpg',
  'Chemical-Reactor.jpg',
  'air17.jpg'
];

testFiles.forEach(f => {
  const p = path.join(__dirname, '..', 'public', 'images', f);
  if (fs.existsSync(p)) {
    const dim = getDimensions(p);
    console.log(`${f}: ${dim.width}x${dim.height}`);
  }
});
