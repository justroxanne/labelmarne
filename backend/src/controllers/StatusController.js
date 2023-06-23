const BaseController = require('./BaseController')

// possibilité de getById, getAll, update

class StatusController extends BaseController{
  constructor(req, res) {
    super(req , res);
    this.model = model.status;
  }
}

module.exports =StatusController;