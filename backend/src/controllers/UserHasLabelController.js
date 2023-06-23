const BaseController = require('./BaseController');
const models = require('../models');

class UserHasLabelController extends BaseController {
    constructor(req, res) {
        super(req, res);
        this.model = models.userHasLabel;
    }

    static async getLabelByUser(req, res)
    }