const BaseController = require('./BaseController');
const models = require('../models');

class roleController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.role;
  }
}

module.exports = roleController;
