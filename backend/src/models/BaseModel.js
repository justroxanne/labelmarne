const { db } = require('../config');

class BaseModel {
  table;
  db;

  constructor(table) {
    this.db = db;
    this.table = table;
  }

  getAll() {
    return this.db.query(`SELECT * FROM ${this.table}`);
  }

  getOne(params) {
    const paramsKey = Object.keys(params).join();
    const paramsValue = Object.values(params).join();

    return this.db.query(`SELECT * FROM ${this.table} WHERE ${paramsKey} = ?`, [
      paramsValue,
    ]);
  }

  create(data) {
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);
    const fillKeys = dataKeys.map((key) => key).join(', ');
    const fillValues = dataValues.map((value) => `?`).join(', ');

    return this.db.query(
      `INSERT INTO ${this.table} (${fillKeys}) VALUES (${fillValues})`,
      [...dataValues]
    );
  }

  update(params, data) {
    const paramsKeys = Object.keys(params);
    const paramsValues = Object.values(params);
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);

    const fill = dataKeys.map((key) => `${key} = ?`).join(', ');

    return this.db.query(
      `UPDATE ${this.table} SET ${fill} WHERE ${paramsKeys} = ${paramsValues}`,
      [...dataValues]
    );
  }

  delete(params) {
    const paramsKey = Object.keys(params);
    const paramsValue = Object.values(params);
    return this.db.query(`DELETE FROM ${this.table} WHERE ${paramsKey} = ?`, [
      paramsValue,
    ]);
  }
}

module.exports = BaseModel;
