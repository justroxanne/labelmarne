const { db } = require('../config');

class BaseModel {
  table;
  db;

  constructor(table) {
    this.table = table;
    this.db = db;
  }

  getAll() {
    return this.db.query(`SELECT * FROM ${this.table}`);
  }

  getOne(params) {
    const paramsKey = Object.keys(params);
    const paramsValue = Object.values(params);
    return this.db.query(`SELECT * FROM ${this.table} WHERE ${paramsKey} = ?`, [
      paramsValue,
    ]);
  }

  create(data) {
    const dataKey = Object.keys(data);
    const dataValue = Object.values(data);
    const fill = dataValue.map((value) => '?').join(', ');
    return this.db.query(
      `INSERT INTO ${this.table} (${dataKey}) VALUES (${fill})`,
      [dataValue]
    );
  }

  update(params, data) {
    const paramsKey = Object.keys(params);
    const paramsValue = Object.values(params);
    const dataKey = Object.keys(data);
    const dataValue = Object.values(data);
    const fill = dataKey.map((key) => `${key} = ?`).join(', ');
    return this.db.query(
      `UPDATE ${this.table} SET ${fill} WHERE ${paramsKey} = ?`,
      [dataValue, paramsValue]
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
