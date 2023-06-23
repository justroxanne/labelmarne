const BaseModel = require('./BaseModel');

class UserHasLabelModel extends BaseModel {
  constructor() {
    super('users_has_labels');
  }
}

module.exports = UserHasLabelModel;
