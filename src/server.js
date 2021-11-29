// NOTE: you may need to do `n lts`
// Load HTTP module
const http = require('http');

// Create a simple server!  This
// will call the callback function whenever we
// make a request to the server
const server = http.createServer((req, res) => {
    // Set response header (HTTP type and content type)
    // As well as the response body
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello web dev!');
});

// Start up the server (first argument is port
// Second is hostname (localhost)
server.listen(8000, "127.0.0.1", () => {
    console.log(`Starting server`);
}) 