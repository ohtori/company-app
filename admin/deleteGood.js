"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Good = require('../models/Good');
async function deleteGood(goodTitle) {
    const deleting = await Good.findOne({ title: goodTitle });
    if (!deleting)
        return;
    //in prod or lounched need change path 'C:/Users/Ohtori/company-app' to 'require('config').get('serverConfig.baseUrl')'
    await require('fs').unlink('C:/Users/Ohtori/company-app' + deleting.imgURL, (err) => {
        if (err) {
            console.log(err.message);
        }
    });
    await Good.deleteOne({ title: goodTitle });
}
module.exports = deleteGood;
