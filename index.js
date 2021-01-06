"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require('https');
const fs = require('fs');
const cluster = require('cluster');
const path = require('path');
const cpus = require('os').cpus().length;
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const uploadRoute = require('./routes/uploadRoute');
const authRoute = require('./routes/authRoute');
const basketRoute = require('./routes/basketRoute');
const getGoodsRouter = require('./routes/getGoodsRouter');
const goodRouter = require('./routes/goodRouter');
const getCategoriesRouter = require('./routes/getCategoriesRouter');
const getCategoryRouter = require('./routes/getCategoryRouter');
//For export:
//mongoexport -d company-entertainment-db -c "collection name" -o C:\Users\Ohtori\company-app\dbDump\out.json
async function start() {
    try {
        const app = express();
        app.post('/admin/upload', uploadRoute);
        app.post('/admin/auth', authRoute);
        app.post('/basket', basketRoute);
        app.get('/good', goodRouter);
        app.get('/get-goods', getGoodsRouter);
        app.get('/get-categories', getCategoriesRouter);
        app.get('/get-category', getCategoryRouter);
        app.get('/images', express.static(path.join(__dirname, 'client', 'public')));
        if (process.env.MODE === 'production') {
            app.use(express.static(path.join(__dirname, 'client', 'build')));
            app.get('*', (req, res) => {
                res.status(200).sendFile(path.join(__dirname, '/client/build/index.html'));
            });
        }
        if (process.env.MODE === 'production') {
            app.listen(config.get('serverConfig.HTTPPort'), () => console.log(`Server started on prod port`));
            await mongoose.connect(config.get('dbConfig.url'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        }
        else {
            app.listen(config.get('serverConfig.devPort'), () => console.log(`Server started on dev port`));
            await mongoose.connect(config.get('dbConfig.url'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        }
        console.log('Mongo db connected');
    }
    catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}
if (cluster.isMaster) {
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    start();
    console.log(`Worker ${process.pid} started`);
}
