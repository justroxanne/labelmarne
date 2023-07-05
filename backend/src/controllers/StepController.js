const BaseController = require('./BaseController');
const models = require('../models');

class StepController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.StepModel;
  }
}

module.exports = StepController;
