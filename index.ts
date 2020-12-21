import { IncomingMessage } from "http";

const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
//For start on win32:
//mongod --dbpath "mongo db root(bin) folder for examle '.'" --storageEngine "mmapv1"
//For export:
//mongoexport -d company-entertainment-db -c "collection name" -o C:\Users\Ohtori\company-app\dbDump\out.json

const app = express();

app.post('/admin/upload', (req: IncomingMessage, res: any) => {  
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
  });
});

const PORT = process.env.MODE === 'production' 
  ? config.get('serverConfig.HTTPPort') 
  : config.get('serverConfig.devPort');

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    await mongoose.connect(config.get('dbConfig.url'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Mongo db connected');
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();