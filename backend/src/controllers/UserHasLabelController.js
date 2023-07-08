const BaseController = require('./BaseController');
const { user } = require('../models');

class UserHasLabelController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new userHasLabel();
  }
}
