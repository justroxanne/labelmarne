const BaseController = require('./BaseController');
const { AddressModel } = require('../models');

class AddressController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new AddressModel();
  }
}

module.exports = AddressController;
