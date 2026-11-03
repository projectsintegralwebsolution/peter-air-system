const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'C:/Users/admin/.gemini/antigravity/brain/4b9068d2-a665-4ba5-9a23-b775ef37b819/scratch/2025 Lainrun Group Sandwich Panel Catalog (1)_compressed.pdf';
const pagesDir = 'C:/Users/admin/.gemini/antigravity/brain/4b9068d2-a665-4ba5-9a23-b775ef37b819/scratch/pdf_pages';
const imagesDir = 'C:/Users/admin/.gemini/antigravity/brain/4b9068d2-a665-4ba5-9a23-b775ef37b819/scratch/catalog_images';

fs.mkdirSync(pagesDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

async function extractPages() {
  console.log('Loading PDF...');
  const buf = fs.readFileSync(pdfPath);
  const parser = new PDFParse({ data: buf });
  
  // 1. Extract embedded JPEG images from stream
  console.log('Extracting embedded JPEGs...');
  let offset = 0;
  let idx = 1;
  const startMarker = Buffer.from([0xFF, 0xD8, 0xFF]);
  const endMarker = Buffer.from([0xFF, 0xD9]);

  while (offset < buf.length) {
    const start = buf.indexOf(startMarker, offset);
    if (start === -1) break;
    let end = buf.indexOf(endMarker, start + 3);
    while (end !== -1 && (end - start) < 1500) {
      end = buf.indexOf(endMarker, end + 2);
    }
    if (end === -1) break;
    const imgBuf = buf.subarray(start, end + 2);
    
    let w = 0, h = 0;
    for (let i = 2; i < imgBuf.length - 9; i++) {
      if (imgBuf[i] === 0xFF && (imgBuf[i+1] === 0xC0 || imgBuf[i+1] === 0xC1 || imgBuf[i+1] === 0xC2)) {
        h = imgBuf.readUInt16BE(i + 5);
        w = imgBuf.readUInt16BE(i + 7);
        break;
      }
    }
    const fname = `raw-img-${String(idx).padStart(3, '0')}_${w}x${h}.jpg`;
    if (imgBuf.length > 3000 && w >= 100 && h >= 100) {
      fs.writeFileSync(path.join(imagesDir, fname), imgBuf);
      console.log(`Saved ${fname} (${imgBuf.length} bytes)`);
    }
    idx++;
    offset = end + 2;
  }

  // 2. Render all 32 pages using getScreenshot
  console.log('Rendering all 32 pages to PNG...');
  const screenshots = await parser.getScreenshot({
    scale: 1.5,
    imageDataUrl: true
  });

  console.log(`Rendered ${screenshots.pages.length} pages.`);
  for (const page of screenshots.pages) {
    if (page.dataUrl) {
      const base64Data = page.dataUrl.replace(/^data:image\/png;base64,/, '');
      const pageFname = `page-${String(page.pageNumber).padStart(2, '0')}.png`;
      fs.writeFileSync(path.join(pagesDir, pageFname), Buffer.from(base64Data, 'base64'));
      console.log(`Saved ${pageFname} (${page.width}x${page.height})`);
    }
  }

  console.log('Done extraction!');
}

extractPages().catch(console.error);
