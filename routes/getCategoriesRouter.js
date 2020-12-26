"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category = require('../models/Category');
async function getCategoriesRouter(req, res) {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    }
    catch (e) {
        res.status(500).json({ message: 'Ошибка сервера, попробуйте позже', isError: true });
    }
}
module.exports = getCategoriesRouter;
