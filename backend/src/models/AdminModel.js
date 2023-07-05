const BaseModel = require('./BaseModel');

class AdminModel extends BaseModel {
  constructor(db) {
    super('admin', db);
  }
}

module.exports = AdminModel;
