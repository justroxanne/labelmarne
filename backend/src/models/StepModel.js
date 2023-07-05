const BaseModel = require('./BaseModel');
const db = require('../config/db');

class StepModel extends BaseModel {
  constructor(db) {
    super('step', db);
  }
}

module.exports = StepModel;
