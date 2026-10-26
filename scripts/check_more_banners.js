const fs = require('fs');
const urls = JSON.parse(fs.readFileSync('data/image_urls.json', 'utf8'));

console.log('Searching for banner/slider in image_urls:');
urls.filter(u => u.match(/(?:slide|banner|cleanroom|hvac|hero|header)/i)).forEach(u => console.log(' - ' + u));
