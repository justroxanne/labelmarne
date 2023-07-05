const BaseModel = require('./BaseModel');

class AdminModel extends BaseModel {
  constructor() {
    super('admin');
  }
}

module.exports = AdminModel;
