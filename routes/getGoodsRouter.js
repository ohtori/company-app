"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Good = require('../models/Good');
async function getGoodsRouter(req, res) {
    try {
        const queryParams = req.query;
        const goodsLimit = +queryParams.quantity;
        const dbReq = {};
        console.log(queryParams);
        if (queryParams.sale) {
            dbReq.sale = { $gt: 0 };
        }
        if (queryParams.category) {
            dbReq.category = queryParams.category;
        }
        if (queryParams.page) {
            const goods = await Good
                .find(dbReq)
                .limit(goodsLimit)
                .skip((+queryParams.page - 1) * goodsLimit);
        }
        else {
            const goods = await Good.find(dbReq).limit(goodsLimit).select('-desc').sort({ price: 1 });
            res.status(200).json(goods);
        }
    }
    catch (e) {
        res.status(500).json({ message: 'Ошибка сервера, попробуйте позже', isError: true });
    }
}
module.exports = getGoodsRouter;
