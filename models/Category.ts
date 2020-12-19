const { Schema, model, Types } = require('mongoose');

 const CategorySchema = new Schema({
  title: { type: String, unique: true, required: true },
  desc: { type: String },
  good_list: [{ type: Types.ObjectId, ref: 'Good' }]
});

module.exports = model('Category', CategorySchema);
export {};