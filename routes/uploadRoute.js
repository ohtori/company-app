"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writeCSVToDB = require('../admin/index');
function uploadRoute(req, res) {
    const writeble = require('fs').createWriteStream('./csv_sources/price-latest.csv');
    let chunks = [];
    req.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk));
        req.resume();
    });
    req.on('end', () => {
        writeble.write(Buffer.concat([...chunks]));
        req.resume();
        res.status(200).json({ message: 'Файл загружен!' });
        writeCSVToDB('price-latest.csv');
    });
}
module.exports = uploadRoute;
