const BaseModel = require('./BaseModel');

class LabelModel extends BaseModel {
  constructor() {
    super('label');
  }

  async createLabel(labelData, category) {
    const labelKeys = Object.keys(labelData);
    const labelValues = Object.values(labelData);
    const categoryId = category.id;

    const labelFillKeys = labelKeys.map((key) => key).join(', ');
    const labelFillValues = labelValues.map((value) => `?`).join(', ');

    return this.db.query(
      `INSERT INTO label (${labelFillKeys}, category_id) VALUES (${labelFillValues}, ?)`,
      [...labelValues, categoryId]
    );
  }
}

module.exports = LabelModel;
