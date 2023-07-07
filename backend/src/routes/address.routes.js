const express = require('express');
const AddressController = require('../controllers/AddressController');
const { authorization, isAdmin } = require('..//middleware/auth');

const addressRouter = express.Router();

addressRouter.get('/address', authorization, isAdmin, async (req, res) => {
  new AddressController(req, res).getAll();
}); //Route OK

addressRouter.get(
  '/address/:id',
  authorization,
  isAdmin,
  async (req, res, next) => new AddressController(req, res, next).getOne()
); //Route OK

addressRouter.post('/address', async (req, res) =>
  new AddressController(req, res).create()
); // Route OK

addressRouter.put('/address/:id', authorization, async (req, res, next) =>
  new AddressController(req, res, next).update()
); // Route OK

addressRouter.delete(
  '/address/:id',
  authorization,
  isAdmin,
  async (req, res, next) => new AddressController(req, res, next).delete()
); // Route OK

module.exports = addressRouter;
