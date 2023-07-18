const BaseController = require('./BaseController');
const { StatusModel } = require('../models');

class StatusController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new StatusModel();
  }
}

module.exports = StatusController;
