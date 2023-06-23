const BaseController = require('./BaseController');
const models = require('../models');

class LabelsController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.labels;
  }
}

module.exports = LabelsController;
