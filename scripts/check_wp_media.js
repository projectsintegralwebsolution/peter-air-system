async function checkWpMedia() {
  const urls = [
    'https://peterairs.com/wp-content/uploads/2024/12/PETER-AIR-LOGO.png',
    'https://peterairs.com/wp-content/uploads/2024/12/logo.png',
    'https://peterairs.com/wp-content/uploads/2024/12/logo-white.png',
    'https://peterairs.com/wp-content/uploads/2024/12/peter-air-logo.png',
    'https://peterairs.com/wp-content/uploads/2022/07/PETER-AIR-LOGO.png',
    'https://peterairs.com/wp-content/uploads/2022/07/logo.png',
    'https://peterairs.com/wp-content/uploads/2022/07/logo-white.png',
    'https://peterairs.com/wp-content/uploads/2022/07/peter-air-logo.png',
    'https://peterairs.com/wp-content/uploads/2025/01/PETER-AIR-LOGO.png',
    'https://peterairs.com/wp-content/uploads/2026/03/PETER-AIR-LOGO.png',
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(url, res.status, res.headers.get('content-length'), res.headers.get('content-type'));
    } catch(e) {
      console.log(url, 'error');
    }
  }
}
checkWpMedia();
