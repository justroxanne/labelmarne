const BaseModel = require('./BaseModel');
const db = require('../config/db');

class CategoryModel extends BaseModel {
  constructor(db) {
    super('category', db);
  }
}

module.exports = CategoryModel;
