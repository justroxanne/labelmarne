const BaseController = require('./BaseController');
const models = require('../models');

class CategoryController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = models.CategoryModel;
  }
}

module.exports = CategoryController;
