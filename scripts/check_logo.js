async function check() {
  try {
    const res = await fetch('https://peterairs.com/');
    const text = await res.text();
    const imgs = text.match(/<img[^>]+>/g) || [];
    for (const img of imgs) {
      if (img.toLowerCase().includes('logo') || img.toLowerCase().includes('peter')) {
        console.log('Found image:', img);
      }
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
check();
