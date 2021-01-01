"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category = require('../models/Category');
async function getCategoriesRouter(req, res) {
    try {
        const category = await Category.find({ title: req.query.category });
        res.status(200).json(category);
    }
    catch (e) {
        res.status(500).json({ message: 'Ошибка сервера, попробуйте позже', isError: true });
    }
}
module.exports = getCategoriesRouter;
