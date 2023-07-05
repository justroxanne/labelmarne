const BaseModel = require('./BaseModel');
const db = require('../config/db');

class RoleModel extends BaseModel {
  constructor(db) {
    super('role', db);
  }
}

module.exports = RoleModel;
