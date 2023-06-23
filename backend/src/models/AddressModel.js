const BaseModel = require('./BaseModel');

class AddressModel extends BaseModel {
  constructor() {
    super('addresses');
  }
}

module.exports = AddressModel;
