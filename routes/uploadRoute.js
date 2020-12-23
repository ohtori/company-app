"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config = require('config');
const writeCSVToDB = require('../admin/index');
function uploadRoute(req, res) {
    const writeble = require('fs').createWriteStream(config.get('csv_path'));
    const errMessage = { message: 'У вас недостаточно прав или вы не авторизованы', isError: true };
    if (!req.headers.authorization) {
        return res.status(401).json(errMessage);
    }
    try {
        const token = jwt.verify(req.headers.authorization, config.get('serverConfig.jwtSecret'));
        if (token.user.role !== 'Admin') {
            return res.status(401).json(errMessage);
        }
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
        req.on('error', () => {
            res.status(500).json({ message: 'Ошибка при чтении файла, попробуйте еще раз' });
        });
    }
    catch (e) {
        return res.status(401).json(errMessage);
    }
}
module.exports = uploadRoute;
