const path = require('path');
const fs = require('fs');

const load = (models) => {
  const modelsPath = path.join(__dirname, 'models');
  const modelFiles = fs.readdirSync(modelsPath);

  modelFiles.forEach((file) => {
    const model = require(path.join(modelsPath, file));
    models[model.name] = model;
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
