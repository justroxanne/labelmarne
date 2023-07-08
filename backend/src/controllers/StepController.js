const BaseController = require('./BaseController');
const { StepModel } = require('../models');

class StepController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new StepModel();
  }
}

module.exports = StepController;
