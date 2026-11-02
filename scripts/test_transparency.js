const fs = require('fs');
const zlib = require('zlib');

// Let's inspect the colors of PETER-AIR-LOGO.png to see what colors the logo has:
// The P letter is teal/blue. The text is red/blue.
// The background is near-white (R > 240, G > 240, B > 240).
const { width, height, pixels } = require('./decode_png_func.js');
console.log('Testing transparency conversion...');
