const http = require('http');
const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Error handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  server.listen(port, () => {
    console.log(`> Peter Air Systems production server ready on http://${hostname}:${port}`);
  });

  // Also listen on 3005 on the same server instance
  const server3005 = http.createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Error handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  server3005.listen(3005, () => {
    console.log(`> Peter Air Systems production server also ready on http://${hostname}:3005`);
  });
}).catch(err => {
  console.error('App prepare error:', err);
  process.exit(1);
});
