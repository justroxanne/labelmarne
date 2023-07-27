const express = require('express');
const UserHasLabelController = require('../controllers/UserHasLabelController');

const userHasLabelRouter = express.Router();

userHasLabelRouter.get('/userHasLabels', async (req, res) =>
  new UserHasLabelController(req, res).getAllLabelsByUserId()
);

userHasLabelRouter.get('/userHasLabels/:id', async (req, res) =>
  new UserHasLabelController(req, res).getOne()
);

module.exports = userHasLabelRouter;
