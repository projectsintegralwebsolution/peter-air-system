const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!['node_modules', '.git', '.next', '.gemini'].includes(f)) res = res.concat(walk(p));
    } else {
      res.push(p);
    }
  }
  return res;
}

const all = walk('src');
let singularTotal = 0;
let standaloneTotal = 0;
const findings = [];

for (const f of all) {
  if (f.endsWith('.bak')) continue;
  const content = fs.readFileSync(f, 'utf8');

  // 1. Singular Peter Air System
  const singular = [...content.matchAll(/\bPeter\s+Air\s+System\b(?![sS])/gi)].filter(m => {
    const sub = content.slice(Math.max(0, m.index - 15), m.index + m[0].length + 15);
    return !(/@peterairsystem/i.test(sub) || /\/peter-air-system\b/i.test(sub) || /peter-air-system\.git/i.test(sub));
  });
  if (singular.length > 0) {
    findings.push({ file: f, type: 'SINGULAR', count: singular.length });
    singularTotal += singular.length;
  }

  // 2. Standalone Peter Air (not followed by Systems)
  const standalone = [...content.matchAll(/\b[Pp]eter\s+[Aa]ir\b(?!\s*Systems?\b)/gi)].filter(m => {
    const sub = content.slice(Math.max(0, m.index - 25), m.index + m[0].length + 30);
    if (/PETER-AIR-LOGO/i.test(sub) || /peter-air-/i.test(sub) || /peterairs/i.test(sub) || /peter_air/i.test(sub) || /@peterairsystem/i.test(sub)) return false;
    if (f.includes('Header.tsx') || f.includes('Footer.tsx') || f.includes('EnquiryModal.tsx')) {
      const nextSlice = content.slice(m.index, m.index + 120);
      if (/SYSTEMS/i.test(nextSlice)) return false;
    }
    return true;
  });
  if (standalone.length > 0) {
    findings.push({ file: f, type: 'STANDALONE', count: standalone.length });
    standaloneTotal += standalone.length;
  }
}

console.log('=== WEBSITE BRAND AUDIT REPORT ===');
console.log('Files scanned in src/:', all.length);
console.log('Total Singular "Peter Air System" found:', singularTotal);
console.log('Total Standalone "Peter Air" found:', standaloneTotal);
if (findings.length > 0) {
  console.log('\nFindings breakdown:');
  console.log(JSON.stringify(findings, null, 2));
} else {
  console.log('\nSUCCESS: 100% compliant with "Peter Air Systems" brand name across all website code and data!');
}
