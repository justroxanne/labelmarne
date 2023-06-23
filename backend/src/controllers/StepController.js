const BaseController = require('./BaseController');
const models = require('../models');

class stepController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.step;
  }
}

module.exports = stepController;
