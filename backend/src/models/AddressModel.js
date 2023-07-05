const BaseModel = require('./BaseModel');
const db = require('../config/db');

class AddressModel extends BaseModel {
  constructor(db) {
    super('address', db);
  }
}

module.exports = AddressModel;
