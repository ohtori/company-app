const Good = require('../models/Good');

async function deleteGood(goodTitle: string) {
  try {
    const deleting = await Good.findOne({ title: goodTitle });
    if (!deleting) return;
    //in prod or lounched need change path 'C:/Users/Ohtori/company-app' to 'require('config').get('serverConfig.baseUrl')'
    await require('fs').unlink('C:/Users/Ohtori/company-app/client/public' + deleting.imgURL, (err: Error) => {
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