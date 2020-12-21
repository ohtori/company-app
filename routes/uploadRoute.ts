import {Request, Response} from 'express';

const writeCSVToDB = require('../admin/index');

function uploadRoute (req: Request, res: Response) {    
  const writeble = require('fs').createWriteStream('./csv_sources/price-latest.csv');
  let chunks: Buffer[] = [];
  req.on('data', (chunk) => {
    chunks.push(Buffer.from(chunk));
    req.resume();
  });

  req.on('end', () => {
    writeble.write(Buffer.concat([...chunks]));
    req.resume();
    res.status(200).json({message: 'Файл загружен!'});
    writeCSVToDB('price-latest.csv');
  });
}

module.exports = uploadRoute;