const http = require('http');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = 3006;
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
    console.log(`> Peter Air Systems production server listening on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
