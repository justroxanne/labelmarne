const BaseModel = require('./BaseModel');
const db = require('../config/db');

class LabelModel extends BaseModel {
  constructor(db) {
    super('label', db);
  }
}

module.exports = LabelModel;
