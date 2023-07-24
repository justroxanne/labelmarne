const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
  constructor(db) {
    super('user', db);
  }

  async register(addressData, userData) {
    const addressKeys = Object.keys(addressData);
    const addressValues = Object.values(addressData);
    const addressFillKeys = addressKeys.map((key) => key).join(', ');
    const addressFillValues = addressValues.map((value) => `?`).join(', ');

    const userKeys = Object.keys(userData);
    const userValues = Object.values(userData);
    const userFillKeys = userKeys.map((key) => key).join(', ');
    const userFillValues = userValues.map((value) => `?`).join(', ');

    return this.db
      .query(
        `INSERT INTO address (${addressFillKeys}) VALUES (${addressFillValues})`,
        [...addressValues]
      )
      .then(([result]) => {
        const addressId = result.insertId;
        return this.db.query(
          `INSERT INTO user (${userFillKeys}, address_id) VALUES (${userFillValues}, ?)`,
          [...userValues, addressId]
        );
      });
  }

  async getUserByEmail(email) {
    return this.db.query(
      `SELECT user.*, address.* FROM user INNER JOIN address ON user.address_id = address.id WHERE user.email = ?`,
      [email]
    );
  }
}

module.exports = UserModel;
