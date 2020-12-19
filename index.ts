const mongoose = require('mongoose');
const config = require('config');

//csv to db
const writeCSVToDB = require('./admin/index');
//For start on win32:
//mongod --dbpath "mongo db root(bin) folder for examle '.'" --storageEngine "mmapv1"
//For export:
//mongoexport -d company-entertainment-db -c "collection name" -o C:\Users\Ohtori\company-app\dbDump\out.json
const Good = require('./models/Good');
const Category = require('./models/Category');

const PORT = process.env.MODE === 'production' 
  ? config.get('serverConfig.HTTPPort') 
  : config.get('serverConfig.devPort');

async function start() {
  try {
    await mongoose.connect(config.get('dbConfig.url'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Mongo db connected');
    await writeCSVToDB('price2.csv');
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();