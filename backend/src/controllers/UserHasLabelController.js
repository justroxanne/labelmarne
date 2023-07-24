const BaseController = require('./BaseController');

class UserHasLabelController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new userHasLabel();
  }
}

module.exports = UserHasLabelController;
