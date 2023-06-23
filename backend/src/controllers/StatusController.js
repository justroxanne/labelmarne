const BaseController = require('./BaseController')

class StatusController extends BaseController{
  constructor(req, res) {
    super(req , res);
    this.model = model.status;
  }
}

module.exports =StatusController;