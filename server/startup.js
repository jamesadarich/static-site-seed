var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
 
// Serve up public/ftp folder
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']});
 
// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res));
});

const PORT_NUMBER = 8080;
 
// Listen
server.listen(PORT_NUMBER);

console.log(`server listening at port ${PORT_NUMBER}`);
