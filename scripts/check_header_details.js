async function checkHeaderDetails() {
  const res = await fetch('https://peterairs.com/');
  const text = await res.text();
  const pos = 72619;
  console.log(text.substring(pos - 400, pos + 400));
}
checkHeaderDetails();
