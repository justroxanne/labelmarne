const express = require('express');
const LabelController = require('../controllers/LabelController');
const { authorization, isAdmin } = require('../middleware/auth');

const labelRouter = express.Router();

labelRouter.get('/labels', async (req, res) => {
  new LabelController(req, res).getAll();
});

labelRouter.get('/labels/:id', async (req, res) => {
  new LabelController(req, res).getOne();
});

labelRouter.post('/labels', authorization, isAdmin, async (req, res) => {
  new LabelController(req, res).newLabel();
});

labelRouter.put('/labels/:id', authorization, isAdmin, async (req, res) => {
  new LabelController(req, res).update();
});

labelRouter.delete('/labels/:id', authorization, isAdmin, async (req, res) => {
  new LabelController(req, res).delete();
});

module.exports = labelRouter;
