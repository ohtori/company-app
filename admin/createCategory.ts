const Category = require('../models/Category');

async function createCategory(categoryName: string) {
  try {    
    let prevCategory = await Category.findOne({ title: categoryName });

    if (!prevCategory) {
      const newCategory = new Category({
        title: categoryName.trim(),
        good_list: []
      });
      prevCategory = await newCategory.save();
    }
    return prevCategory;
  } catch (e) {
    throw new Error(`Error when category creating ${e.message}`);
  }
}

module.exports = createCategory;
export {}