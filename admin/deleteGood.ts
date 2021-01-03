const path = require('path');
const Good = require('../models/Good');

async function deleteGood(goodTitle: string) {
  try {
    const deleting = await Good.findOne({ title: goodTitle });
    if (!deleting) return;
    await require('fs').unlink(path.join(__dirname, 'client', 'public') + deleting.imgURL, (err: Error) => {
      if (err) {
        console.log(err.message);
      }
    });
    await Good.deleteOne({ title: goodTitle });
  } catch (e) {
    throw new Error('Error when good deleting');
  }
}

module.exports = deleteGood;
export {};