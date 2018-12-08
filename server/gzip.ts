import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { gzipSync } from "zlib";
import * as glob from "glob";

const publicPath = resolve(__dirname, "../public");
const gzippable = glob.sync(`${publicPath}/**/?(*.html|*.js|*.css)`);
gzippable.forEach((file: any) => {
  const content = readFileSync(file);
  const zipped = gzipSync(content);
  writeFileSync(`${file}`, zipped);
});
