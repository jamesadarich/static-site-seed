var express = require("express");
var path = require("path");

const app = express();
 
app.use((error, request, response, next) => {    
  response.setHeader("Referrer-Policy", "strict-origin");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Xss-Protection", "1; mode=block");
  response.setHeader("X-Frame-Options", "SAMEORIGIN");
  next(error);
});

// Serve up public/ftp folder
app.use(express.static("public", {
    index: "index.html",
    setHeaders: setHeaders
}));

app.use((request, response) => {
    sendStatusFile(404, response);
});

app.use((error, request, response, next) => {
    sendStatusFile(500, response);
});

// Set header to force download
function setHeaders (res, path) {
  if (/(html|css|javascript)$/.test(express.static.mime.lookup(path))) {
      res.setHeader("Content-Encoding", "gzip");
  }
}

const sendStatusFile = (status, response) => {
    response.status(status);
    response.setHeader("Content-Encoding", "gzip");
    response.sendFile(path.resolve(`./public/${status}/index.html`));
}

const PORT_NUMBER = 8080;
 
// Listen
app.listen(PORT_NUMBER);

console.log(`server listening at port ${PORT_NUMBER}`);
