const BaseController = require('./BaseController');
const models = require('../models');

class StepsController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.steps;
  }
}

module.exports = StepsController;
