const BaseModel = require('./BaseModel');

class AdminsModel extends BaseModel {
  constructor() {
    super('admins');
  }
}

module.exports = AdminsModel;
