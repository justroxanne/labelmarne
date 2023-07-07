const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
  constructor(db) {
    super('user', db);
  }
}

module.exports = UserModel;
