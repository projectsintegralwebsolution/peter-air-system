const fs = require('fs');
const homeHtml = fs.readFileSync('data/home.html', 'utf8');

// Look for slider or elementor hero slides
const sliderImgs = [...homeHtml.matchAll(/data-settings=[\"\']([^\"\']*(?:slider|slide|carousel)[^\"\']*)[\"\']/gi)];
console.log('Slider settings matches:', sliderImgs.length);

// Look for all background images or slider images in homeHtml
const bgImgs = [...homeHtml.matchAll(/background-image:\s*url\(([^)]+)\)/gi)].map(m => m[1].replace(/['"]/g, ''));
console.log('Background images on home:', bgImgs);

// Look for images in the first 20000 characters of homeHtml
const topImgs = [...homeHtml.slice(0, 30000).matchAll(/<img[^>]+src=[\"\']([^\"\']+)[\"\'][^>]*>/gi)].map(m => m[1]);
console.log('Top images in homeHtml:', [...new Set(topImgs)].slice(0, 15));
