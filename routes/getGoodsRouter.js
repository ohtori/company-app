"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Good = require('../models/Good');
async function getGoodsRouter(req, res) {
    try {
        const queryParams = req.query;
        const goodsLimit = +queryParams.quantity;
        const dbReq = {};
        if (queryParams.category) {
            dbReq.category = queryParams.category;
        }
        if (queryParams.sale) {
            dbReq.sale = { $gt: 0 };
        }
        if (queryParams.male) {
            dbReq.gender = queryParams.male;
        }
        if (queryParams.country) {
            dbReq.country = queryParams.country;
        }
        if (queryParams.search) {
            const str = String(queryParams.search);
            const regexp = new RegExp(str);
            dbReq.title = regexp;
        }
        if ((+queryParams.priceBy > 0) && (+queryParams.priceBy > +queryParams.priceFrom)) {
            dbReq.price = { $gt: +queryParams.priceFrom, $lt: +queryParams.priceBy };
        }
        if ((+queryParams.priceBy > 0) && (+queryParams.priceBy < +queryParams.priceFrom)) {
            dbReq.price = { $gt: +queryParams.priceBy, $lt: +queryParams.priceFrom };
        }
        console.log(dbReq);
        // if (queryParams.page) {
        //   const goods = await Good
        //     .find(dbReq)
        //     .limit(goodsLimit)
        //     .skip((+queryParams.page - 1 ) * goodsLimit);
        // }
        const goods = await Good.find(dbReq).limit(goodsLimit).select('-desc').sort({ price: 1 });
        res.status(200).json(goods);
    }
    catch (e) {
        res.status(500).json({ message: 'Ошибка сервера, попробуйте позже', isError: true });
    }
}
module.exports = getGoodsRouter;
