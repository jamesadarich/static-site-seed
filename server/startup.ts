import { app } from "./app";
import * as greenlock from "greenlock-express";
import * as https from "https";
import * as http from "http";
import * as redirectHttps from "redirect-https";
import * as leChallengeFs from "le-challenge-fs";
import * as leStoreCertbot from "le-store-certbot";

// returns an instance of node-greenlock with additional helper methods
var lex = greenlock.create({
  // set to https://acme-v01.api.letsencrypt.org/directory in production
  server: "staging",
 
// If you wish to replace the default plugins, you may do so here
//
  challenges: { "http-01": leChallengeFs.create({ webrootPath: "./letsencrypt/var/acme-challenges" }) },
  store: leStoreCertbot.create({ webrootPath: "./letsencrypt/var/acme-challenges" }),
 
// You probably wouldn't need to replace the default sni handler
// See https://git.coolaj86.com/coolaj86/le-sni-auto if you think you do
//, sni: require("le-sni-auto").create({})
 
  approveDomains: approveDomains
});

function approveDomains(opts, certs, cb) {
  // This is where you check your database and associated
  // email addresses with domains and agreements and such
 
 
  // The domains being approved for the first time are listed in opts.domains
  // Certs being renewed are listed in certs.altnames
  if (certs) {
    opts.domains = certs.altnames;
  }
  else {
    opts.domains = [ process.env.SITE_DOMAIN ];
    opts.email = process.env.LETSENCRYPT_USERNAME;
    opts.agreeTos = true;
  }
 
  // NOTE: you can also change other options such as `challengeType` and `challenge`
  // opts.challengeType = "http-01";
  // opts.challenge = require("le-challenge-fs").create({});
 
  cb(null, { options: opts, certs: certs });
}

// handles acme-challenge and redirects to https
http.createServer(lex.middleware(redirectHttps())).listen(process.env.HTTP_PORT || 80, function () {
  console.log("Listening for ACME http-01 challenges on", this.address());
});
 
// handles your app
https.createServer(lex.httpsOptions, lex.middleware(app)).listen(process.env.HTTPS_PORT || 443, function () {
  console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
});
