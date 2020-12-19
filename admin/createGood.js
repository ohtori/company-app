"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Good = require('../models/Good');
const downloadImg = require('./downloadImg');
async function createGood(good, category) {
    try {
        const goodExist = await Good.findOne({ title: good.title });
        const imgURL = await downloadImg(good.imgURL);
        if (goodExist)
            return;
        const newGood = await new Good({
            title: good.title,
            gender: good.gender,
            country: good.country,
            desc: good.desc,
            category: category._id,
            imgURL,
            price: good.price,
            sale: good.sale
        }).save();
        category.good_list.push(newGood._id);
        await category.save();
    }
    catch (e) {
        throw new Error(`Error when good creating: ${e.message}`);
    }
}
module.exports = createGood;
