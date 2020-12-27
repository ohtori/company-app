const { Schema, model, Types } = require('mongoose');

 const GoodSchema = new Schema({
  title: { type: String, required: true },
  gender: { type: String },
  country: { type: String },
  desc: { type: String },
  category:  { type: Types.ObjectId, ref: 'Category' },
  imgURL: { type: String, required: true },
  price: { type: Number },
  sale: { type: Number },
  operation: { type: String }
});

module.exports = model('Good', GoodSchema);
export {};