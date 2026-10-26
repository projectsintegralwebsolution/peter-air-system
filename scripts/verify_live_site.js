const http = require('http');

function testUrl(path, expectedStatus = 200) {
  return new Promise((resolve) => {
    http.get('http://localhost:3005' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const ok = res.statusCode === expectedStatus;
        const location = res.headers.location || '';
        resolve({
          path,
          status: res.statusCode,
          expectedStatus,
          ok,
          location,
          length: data.length,
          title: (data.match(/<title[^>]*>(.*?)<\/title>/i) || [])[1] || '',
          h1: (data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]?.replace(/<[^>]+>/g, '').trim() || '',
          hasIntegralCredit: data.includes('integralwebsolution.com'),
          hasWhatsApp: data.includes('wa.me/918484836337'),
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message, ok: false });
    });
  });
}

async function runQA() {
  console.log('--- STARTING COMPREHENSIVE PRODUCTION QA ---');

  const urlsToTest = [
    { path: '/', status: 200 },
    { path: '/air-handling-unit-ahu/', status: 200 },
    { path: '/static-pass-box/', status: 200 },
    { path: '/dynamic-pass-box/', status: 200 },
    { path: '/air-shower/', status: 200 },
    { path: '/bio-safety-cabinets/', status: 200 },
    { path: '/laminar-work-stations/', status: 200 },
    { path: '/hepa-filter/', status: 200 },
    { path: '/mini-pleat-hepa-filter/', status: 200 },
    { path: '/modular-ot/', status: 200 },
    { path: '/modular-clean-room-doors/', status: 200 },
    { path: '/cleanroom-turnkey-solution/', status: 200 },
    { path: '/air-filters/', status: 200 },
    { path: '/clean-room-equipment/', status: 200 },
    { path: '/hvac-products/', status: 200 },
    { path: '/about-us-peter-air-systems/', status: 200 },
    { path: '/services/', status: 200 },
    { path: '/certifications-peter-air-systems-iso-ce-certified-solutions/', status: 200 },
    { path: '/contact-peter-air-systems/', status: 200 },
    { path: '/industries/', status: 200 },
    { path: '/industries/pharmaceuticals/', status: 200 },
    { path: '/blog/', status: 200 },
    { path: '/search/', status: 200 },
    { path: '/sitemap.xml', status: 200 },
    { path: '/robots.txt', status: 200 },
    // 301 Redirect tests
    { path: '/about-us-new/', status: 308 },
    { path: '/return-air-riser-2/', status: 308 },
    { path: '/about/', status: 308 },
  ];

  let passed = 0;
  for (const item of urlsToTest) {
    const res = await testUrl(item.path, item.status);
    if (res.ok) {
      passed++;
      console.log(`✅ [${res.status}] ${item.path} ${res.title ? '-> ' + res.title.slice(0, 50) + '...' : ''} ${res.location ? '-> Redir: ' + res.location : ''}`);
    } else {
      console.log(`❌ [${res.status || 'ERR'}] ${item.path} (Expected ${item.expectedStatus}) ${res.error || ''}`);
    }
  }

  console.log(`\nQA Summary: ${passed} / ${urlsToTest.length} tests passed.`);

  // Test Enquiry API
  console.log('\n--- TESTING ENQUIRY API POST ---');
  const postData = JSON.stringify({
    name: "Test Engineer QA",
    companyName: "QA Pharmaceutical Tech",
    email: "qa@example.com",
    phone: "+91 98765 43210",
    productOrService: "Static Pass Box",
    requirement: "Quotation & Technical Specifications",
    quantity: "2 Units",
    city: "Mumbai",
    message: "Automated QA verification test for RFP endpoint."
  });

  const req = http.request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/enquiry/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => {
      console.log('Enquiry API Response Status:', res.statusCode);
      console.log('Enquiry API Response Body:', d);
    });
  });
  req.on('error', e => console.log('Enquiry API Error:', e.message));
  req.write(postData);
  req.end();
}

runQA();
