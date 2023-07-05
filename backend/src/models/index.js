const path = require('path');
const fs = require('fs');

const load = (models) => {
  const modelFiles = fs.readdirSync(__dirname).filter((file) => {
    return file !== 'index.js' && file !== 'BaseModel.js';
  });
  modelFiles.forEach((file) => {
    const modelName = path.parse(file).name;
    const model = require(path.join(__dirname, file));
    models[modelName] = model;
  });
};

const models = {};

load(models);

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new Error(
      `Model ${prop} does not exist. Did you create ${pascalize(
        prop
      )}Model.js ?`
    );
  },
};

module.exports = new Proxy(models, handler);
