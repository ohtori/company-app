"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const uploadRoute = require('./routes/uploadRoute');
const authRoute = require('./routes/authRoute');
const basketRoute = require('./routes/basketRoute');
const getGoodsRouter = require('./routes/getGoodsRouter');
const goodRouter = require('./routes/goodRouter');
const getCategoriesRouter = require('./routes/getCategoriesRouter');
//For start on win32:
//mongod --dbpath "mongo db root(bin) folder for examle '.'" --storageEngine "mmapv1"
//For export:
//mongoexport -d company-entertainment-db -c "collection name" -o C:\Users\Ohtori\company-app\dbDump\out.json
const app = express();
app.post('/admin/upload', uploadRoute);
app.post('/admin/auth', authRoute);
app.post('/basket', basketRoute);
app.get('/good', goodRouter);
app.get('/get-goods', getGoodsRouter);
app.get('/get-categories', getCategoriesRouter);
app.get('/images', express.static(path.join(__dirname, 'client', 'public')));
if (process.env.MODE === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/client/build/index.html'));
    });
}
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
    }
    catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}
start();
