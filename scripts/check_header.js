async function checkHeader() {
  const res = await fetch('https://peterairs.com/');
  const text = await res.text();
  const headerMatch = text.match(/<header[\s\S]*?<\/header>/i);
  if (headerMatch) {
    console.log('Header content:');
    const imgs = headerMatch[0].match(/<img[^>]+>/g) || [];
    console.log('Images in header:', imgs);
    console.log('Header text slice:', headerMatch[0].substring(0, 1000));
  } else {
    console.log('No <header> found, searching for logo in nav or top section');
    const top = text.substring(0, 10000);
    const imgs = top.match(/<img[^>]+>/g) || [];
    console.log('Top images:', imgs);
  }
}
checkHeader();
