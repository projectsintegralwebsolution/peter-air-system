const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'C:/Users/admin/.gemini/antigravity/brain/4b9068d2-a665-4ba5-9a23-b775ef37b819/scratch/2025 Lainrun Group Sandwich Panel Catalog (1)_compressed.pdf';

async function main() {
  const parser = new PDFParse();
  const buffer = fs.readFileSync(pdfPath);
  await parser.load(buffer);
  
  const info = await parser.getInfo();
  console.log('PDF info:', info);
  
  const totalPages = info.pages || (await parser.getPageText(1) ? 50 : 0);
  console.log('Total pages:', totalPages);
  
  let fullText = '';
  const pageTexts = [];
  for (let i = 1; i <= totalPages; i++) {
    try {
      const pageText = await parser.getPageText(i);
      pageTexts.push({ page: i, text: pageText });
      fullText += `\n\n--- PAGE ${i} ---\n\n` + pageText;
    } catch (err) {
      console.error(`Error on page ${i}:`, err.message);
    }
  }
  
  fs.writeFileSync('scripts/pdf_pages.json', JSON.stringify(pageTexts, null, 2), 'utf8');
  fs.writeFileSync('scripts/pdf_full_text.txt', fullText, 'utf8');
  console.log('Wrote scripts/pdf_pages.json and scripts/pdf_full_text.txt');
}

main().catch(console.error);
