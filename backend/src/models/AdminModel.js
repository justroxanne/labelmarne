const BaseModel = require('./BaseModel');

class AdminModel extends BaseModel {
  constructor(db) {
    super('admin');
  }
}

module.exports = AdminModel;
