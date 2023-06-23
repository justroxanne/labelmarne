const BaseModel = require('./BaseModel');

class CategoriesModel extends BaseModel {
  constructor() {
    super('categories');
  }
}

module.exports = CategoriesModel;
