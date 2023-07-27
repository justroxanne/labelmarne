const BaseController = require('./BaseController');
const userHasLabelModel = require('../models/UserHasLabelModel');

class UserHasLabelController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new userHasLabelModel();
  }

  async getAllLabelsByUserId() {
    const { user_id } = this.req.query;
    const [result] = await this.model.getAllLabelsByUserId(user_id);
    this.res.json(result);
  }

  async addLabelToUser() {
    const { user_id, label_id } = this.req.body;
    const result = await this.model.addLabelToUser(user_id, label_id);
    this.res.json(result);
  }

  async removeLabelFromUser() {
    const { userId, labelId } = this.req.body;
    const result = await this.model.removeLabelFromUser(userId, labelId);
    this.res.json(result);
  }

  async getAllUsersByLabelId() {
    const { labelId } = this.req.params;
    const result = await this.model.getAllUsersByLabelId(labelId);
    this.res.json(result);
  }
}

module.exports = UserHasLabelController;
