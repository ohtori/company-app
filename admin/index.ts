import { ICategory } from '../interfaces/dbInterfaces';

const csvtojson = require('csvtojson');

const Category = require('../models/Category');
const createCategory = require('./createCategory');
const createGood = require('./createGood');
const deleteGood = require('./deleteGood');

async function writeCSVToDB(fileName: string) {
  try {
    const data = await csvtojson()
      .fromFile(require('path').join(__dirname, '..', 'csv_sources', fileName));
    for await (let good of data) {
      if (!good.operation) return;
      switch (good.operation.toLowerCase().trim()) {
        case 'create': {
            const category: ICategory = await createCategory(good.category);
            await createGood(good, category);
          break;
        }
        case 'update': {
            await deleteGood(good.title);
            const category: ICategory = await createCategory(good.category);
            await createGood(good, category);
            break;
        }
        case 'delete': {
            await deleteGood(good.title);
            break;
        }
        case 'delete category': {
            await Category.deleteOne({ title: good.title });
            break;
        }
      }
    }
  } catch (e) {
    throw new Error(`Error when write CSV to bd ${e.message}`);
  }
}

module.exports = writeCSVToDB;
export {}