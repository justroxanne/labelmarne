const BaseModel = require('./BaseModel');

class UserHasLabelModel extends BaseModel {
  constructor() {
    super('user_has_label');
  }

  async getAllLabelsByUserId(userId) {
    return this.db.query(
      `SELECT * from label INNER JOIN user_has_label AS uhl ON label.id=uhl.label_id WHERE uhl.user_id = ?`,
      [userId]
    );
  }

  async addLabelToUser(userId, labelId) {
    return this.db.query(
      `INSERT INTO ${this.table} (user_id, label_id) VALUES (?, ?)`,
      [userId, labelId]
    );
  }

  async removeLabelFromUser(userId, labelId) {
    return this.db.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND label_id = ?`,
      [userId, labelId]
    );
  }

  async getAllUsersByLabelId(labelId) {
    return this.db.query(
      `SELECT user_id FROM ${this.table} WHERE label_id = ?`,
      [labelId]
    );
  }
}

module.exports = UserHasLabelModel;
