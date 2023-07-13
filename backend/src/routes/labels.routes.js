const express = require('express');
const LabelController = require('../controllers/LabelController');
const { authorization, isAdmin } = require('../middleware/auth');

const labelRouter = express.Router();

labelRouter.get('/labels', async (req, res) => {
  new LabelController(req, res).getAll();
});
