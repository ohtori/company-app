import { query, Request, Response } from 'express';

const Good = require('../models/Good');

async function getGoodsRouter (req: Request, res: Response) {
  try {
    const queryParams = req.query;
    const goodsLimit = + queryParams.quantity!;
    const dbReq: any = {};

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

    if ((+queryParams.priceBy! > 0) && (+queryParams.priceBy! > +queryParams.priceFrom! )) {
      dbReq.price = { $gt: +queryParams.priceFrom!, $lt: +queryParams.priceBy! }
    }

    if ((+queryParams.priceBy! > 0) && (+queryParams.priceBy! < +queryParams.priceFrom! )) {
      dbReq.price = { $gt: +queryParams.priceBy!, $lt: +queryParams.priceFrom! }
    }    

    if (queryParams.pagination) {
      const goods = await Good.countDocuments(dbReq);
      return res.status(200).json(goods);
    }
    console.log(queryParams);
    
    if (queryParams.page && +queryParams.page > 1) {
      const goods = await Good.find(dbReq).limit(goodsLimit).select('-desc').sort({ price: 1 }).skip((+queryParams.page - 1 ) * goodsLimit);;
      return res.status(200).json(goods);
    }
    const goods = await Good.find(dbReq).limit(goodsLimit).select('-desc').sort({ price: 1 });
    return res.status(200).json(goods);
    
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера, попробуйте позже', isError: true });
  } 
}

module.exports = getGoodsRouter;