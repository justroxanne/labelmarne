const BaseController = require('./BaseController');

class CategoryController extends BaseController {
    constructor(req , res){
        super(req, res);
        this.model = model.category;
    }
}

module.exports = CategoryController;