const express = require('express');
const LabelController = require('../controllers/LabelController');
const upload = require('../middleware/multer');

const labelRouter = express.Router();

labelRouter.get('/labels', async (req, res) => {
  new LabelController(req, res).getAll();
}); //route OK

labelRouter.post('/labels', upload.single('logo'), async (req, res) => {
  new LabelController(req, res).create();
}); //route OK

labelRouter.delete('/labels/:id', async (req, res) => {
  new LabelController(req, res).delete();
}); //route OK

labelRouter.put('/labels/:id', async (req, res) => {
  new LabelController(req, res).update();
}); //route OK

module.exports = labelRouter;
