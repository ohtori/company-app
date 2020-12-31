import { Request, Response } from 'express';

const Good = require('../models/Good');

async function goodRouter (req: Request, res: Response) {
  try {
    const good = await Good.findOne({_id: req.query.id});
    if (!good) {
      return res.status(404).json({ message: 'Товар не найден' });
    }  

    return res.status(200).json(good);
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера, попробуйте позже', isError: true });
  } 
}

module.exports = goodRouter;