const BaseController = require('./BaseController');
const { LabelModel } = require('../models');

class LabelController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new LabelModel();
  }

  async newLabel() {
    const { name, logo, url } = this.req.body;

    try {
      if (!name || !logo || !url) {
        throw new Error('Veuillez remplir tous les champs');
      }

      const labelData = {
        name,
        logo,
        url,
      };

      const [result] = await this.model.createLabel(labelData);

      if (result.affectedRows !== 0) {
        return this.sendResponse(201, 'Label created');
      }
    } catch (error) {
      this.sendResponse(500, error.message);
    }
  }
}

module.exports = LabelController;
