const BaseController = require('./BaseController');
const { LabelModel } = require('../models');

class LabelController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new LabelModel();
  }
}

module.exports = LabelController;
