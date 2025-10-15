const { createServer } = require('http');

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Simple server is working!');
});

const port = 3123;
const hostname = '0.0.0.0';

server.listen(port, hostname, () => {
  console.log(`Simple server running at http://${hostname}:${port}`);
});