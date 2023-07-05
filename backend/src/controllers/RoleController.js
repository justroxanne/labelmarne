const BaseController = require('./BaseController');
const models = require('../models');

class RoleController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.RoleModel;
  }
}

module.exports = RoleController;
