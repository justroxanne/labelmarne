const BaseModel = require('./BaseModel');

class UsersModel extends BaseModel {
  constructor() {
    super('users');
  }
}

module.exports = UsersModel;
