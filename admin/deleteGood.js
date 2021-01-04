"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const Good = require('../models/Good');
async function deleteGood(goodTitle) {
    try {
        const deleting = await Good.findOne({ title: goodTitle });
        if (!deleting)
            return;
        await require('fs').unlink(path.join(__dirname, 'client', 'public') + deleting.imgURL, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
        await Good.deleteOne({ title: goodTitle });
    }
    catch (e) {
        throw new Error('Error when good deleting');
    }
}
module.exports = deleteGood;
