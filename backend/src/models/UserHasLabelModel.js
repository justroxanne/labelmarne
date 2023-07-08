const BaseModel = require('./BaseModel');

class UserHasLabelModel extends BaseModel {
  constructor() {
    super('user_has_label');
  }
}

// Créer une requête SQL qui permet de récupérer tous les labels d'un utilisateur
// Créer une requête SQL qui permet de récupérer tous les utilisateurs d'un label

async function getAllLabelsByUserId(userId) {
  const [rows] = await this.db.query(
    `SELECT * FROM user_has_label WHERE user_id = ?`,
    [userId]
  );
}

module.exports = UserHasLabelModel;
