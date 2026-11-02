const http = require('http');

http.get('http://localhost:3005/', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const hasCredit = d.includes('integralwebsolution.com') && d.includes('Integral Web Solution');
    console.log('Mandatory credit verified on Homepage:', hasCredit);
    const m = d.match(/<a[^>]*href=["']https:\/\/integralwebsolution\.com\/["'][^>]*>([\s\S]*?)<\/a>/i);
    console.log('Credit link element:', m ? m[0] : 'Not matched');
  });
});
