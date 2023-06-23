const BaseModel = require('./BaseModel');

class AddressesModel extends BaseModel {
  constructor() {
    super('addresses');
  }
}

module.exports = AddressesModel;
