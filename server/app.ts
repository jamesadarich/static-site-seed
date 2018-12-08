import * as express from "express";
import * as path from "path";
import * as enforce from "express-sslify";

const app = express();

app.use((request, response, next) => {
  response.setHeader("Referrer-Policy", "strict-origin");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Xss-Protection", "1; mode=block");
  response.setHeader("X-Frame-Options", "SAMEORIGIN");
  response.setHeader("Strict-Transport-Security", "max-age=31536000;");

  response.removeHeader("X-Powered-By");
  next();
});

//Enforce https with Azure load balancer
app.use(enforce.HTTPS({ trustAzureHeader: true }));

// Serve up public/ftp folder
app.use(
  express.static("public", {
    index: "index.html",
    setHeaders,
    etag: true
  })
);

app.use((request, response) => {
  sendStatusFile(404, response);
});

app.use((error, request, response, next) => {
  sendStatusFile(500, response);
});

function setHeaders(response, filePath) {
  const mimeEncoding = (express.static.mime as any).lookup(filePath);

  if (/(html|css|javascript)$/.test(mimeEncoding)) {
    response.setHeader("Content-Encoding", "gzip");
  }

  if (
    /(css|javascript|json)$/.test(mimeEncoding) ||
    /(\/|\\)public(\/|\\)static(\/|\\)/.test(filePath)
  ) {
    response.setHeader("Cache-Control", "public,max-age=31536000,immutable");
  }
  else if (/^image/.test(mimeEncoding)) {
    response.setHeader("Cache-Control", "max-age=86400");
  }
  else {      
    response.setHeader("Cache-Control", "no-cache");
  }
}

const sendStatusFile = (status, response) => {
  response.status(status);
  response.setHeader("Content-Encoding", "gzip");
  response.sendFile(path.resolve(`./public/${status}/index.html`));
};

export {
    app
}
