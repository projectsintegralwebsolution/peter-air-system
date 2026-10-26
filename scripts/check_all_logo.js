async function checkAllLogo() {
  const res = await fetch('https://peterairs.com/');
  const text = await res.text();
  let pos = 0;
  while ((pos = text.indexOf('PETER-AIR-LOGO.png', pos)) !== -1) {
    console.log('Pos:', pos);
    console.log(text.substring(pos - 250, pos + 250));
    pos += 20;
  }
}
checkAllLogo();
