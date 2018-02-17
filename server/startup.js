var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
 
// Serve up public/ftp folder
var serve = serveStatic('public', {
    'index': ['index.html', 'index.htm'],
    'setHeaders': setHeaders
});

// Set header to force download
function setHeaders (res, path) {
  res.setHeader('Referrer-Policy', "strict-origin");
  res.setHeader('X-Content-Type-Options', "nosniff");
  res.setHeader('X-Xss-Protection', "1; mode=block");
  res.setHeader('X-Frame-Options', "SAMEORIGIN");
  res.removeHeader('')
}
 
// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res));
});

const PORT_NUMBER = 8080;
 
// Listen
server.listen(PORT_NUMBER);

console.log(`server listening at port ${PORT_NUMBER}`);
