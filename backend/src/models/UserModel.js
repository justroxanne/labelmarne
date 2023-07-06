const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
  constructor() {
    super('user');
  }
}

module.exports = UserModel;
