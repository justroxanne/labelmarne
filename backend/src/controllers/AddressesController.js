const BaseController = require('./BaseController');
const models = require('../models');

class AddressesController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.addresses;
  }
}

module.exports = AddressesController;
