async function checkLogoContext() {
  const res = await fetch('https://peterairs.com/');
  const text = await res.text();
  const idx = text.indexOf('PETER-AIR-LOGO.png');
  if (idx !== -1) {
    console.log('Surrounding HTML:');
    console.log(text.substring(idx - 300, idx + 400));
  } else {
    console.log('PETER-AIR-LOGO.png not found');
  }
}
checkLogoContext();
