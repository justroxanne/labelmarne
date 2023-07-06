const BaseModel = require('./BaseModel');

const db = require('../config/db');

class UserModel extends BaseModel {
  constructor(db) {
    super('users', db);
  }
}

module.exports = UserModel;
