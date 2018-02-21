import * as express from "express";
import * as path from "path";

const app = express();

app.use((error, request, response: express.Response, next) => {
  response.setHeader("Referrer-Policy", "strict-origin");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Xss-Protection", "1; mode=block");
  response.setHeader("X-Frame-Options", "SAMEORIGIN");
  response.removeHeader("X-Powered-By");
  next(error);
});

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

  if (/css$/.test(mimeEncoding)) {
    response.setHeader("Cache-Control", "max-age=31536000");
  }
  else if (/javascript$/.test(mimeEncoding)) {
    response.setHeader("Cache-Control", "private, max-age=31536000");
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
