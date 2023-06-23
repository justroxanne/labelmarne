const BaseController = require('./BaseController');
const models = require('../models');

class RolesController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.roles;
  }
}

module.exports = RolesController;
