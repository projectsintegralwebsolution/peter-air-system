async function checkLiveDisplay() {
  const res = await fetch('https://peterairs.com/');
  const text = await res.text();
  // Find where PETER-AIR-LOGO is in the markup
  const regex = /<[^>]+class="[^"]*"[^>]*>[^<]*<a[^>]*>[^<]*<img[^>]+PETER-AIR-LOGO[^>]+>[\s\S]{0,500}/gi;
  const match = text.match(regex);
  console.log('Matches:', match);
}
checkLiveDisplay();
