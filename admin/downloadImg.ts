import { IncomingMessage } from "http";

const https = require('https');
const fs = require('fs');

async function downloadImg(url: string): Promise<string> {
  const ext = require('path').extname(url);
  const imgUrl = '/img_sources/' + Date.now() + ext;
  const file = fs.createWriteStream('./client/build' + imgUrl);
  await https.get(url, 
    function(response: IncomingMessage) {
      response.pipe(file);
    }
  );
  return imgUrl;
}

module.exports = downloadImg;
export {}
