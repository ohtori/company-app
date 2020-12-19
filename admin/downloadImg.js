"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require('https');
const fs = require('fs');
async function downloadImg(url) {
    const ext = require('path').extname(url);
    const imgUrl = '/img_sources/' + Date.now() + ext;
    const file = fs.createWriteStream('./client/public' + imgUrl);
    await https.get(url, function (response) {
        response.pipe(file);
    });
    return imgUrl;
}
module.exports = downloadImg;
