const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const categoryRouter = express.Router();


categoryRouter.get('/categories', async (req, res) =>
    new CategoryController(req, res).getAll()
    );//route OK

categoryRouter.get('/categories/:id', async (req, res) =>
    new CategoryController(req, res).getOne()
    );//route OK

categoryRouter.post('/categories', async (req, res) =>
    new CategoryController(req, res).create()
    );//route OK

categoryRouter.put('/categories/:id', async (req, res) =>
    new CategoryController(req, res).update()
    );//route OK

categoryRouter.delete('/categories/:id', async (req, res) =>
    new CategoryController(req, res,).delete()
    );//route OK

module.exports = categoryRouter;
    