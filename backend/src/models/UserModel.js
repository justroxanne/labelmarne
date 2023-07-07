const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
  constructor(db) {
    super('users', db);
  }

}

module.exports = UserModel;
