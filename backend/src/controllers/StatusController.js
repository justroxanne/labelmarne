const BaseController = require('./BaseController');
const models = require('../models');

class StatusController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.status;
  }
}

module.exports = StatusController;
