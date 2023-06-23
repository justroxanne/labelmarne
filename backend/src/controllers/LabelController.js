const BaseController = require('./BaseController');
const models = require('../models');

class LabelController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.label;
  }
}

module.exports = LabelController;
