const BaseController = require('./BaseController');
const models = require('../models');

class CategoriesController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.categories;
  }
}

module.exports = CategoriesController;
