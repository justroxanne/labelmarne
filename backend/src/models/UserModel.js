const BaseModel = require('./BaseModel');
const db = require('../config/db');

class UserModel extends BaseModel {
  constructor(db) {
    super('user', db);
  }
}

module.exports = UserModel;
