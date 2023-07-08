const express = require('express');
const AdminController = require('../controllers/AdminController');
const { authorization, isAdmin } = require('../middleware/auth');

const adminRouter = express.Router();

adminRouter.get('/admins', authorization, isAdmin, async (req, res) =>
  new AdminController(req, res).getAll()
);

adminRouter.get('/admins/:id', authorization, isAdmin, async (req, res, next) =>
  new AdminController(req, res, next).getOne()
);

adminRouter.post('/admin-register', async (req, res) =>
  new AdminController(req, res).register()
);

adminRouter.post('/admin-login', async (req, res) =>
  new AdminController(req, res).login()
);

adminRouter.put('/admins/:id', authorization, isAdmin, async (req, res, next) =>
  new AdminController(req, res, next).update()
);

adminRouter.delete(
  '/admins/:id',
  authorization,
  isAdmin,
  async (req, res, next) => new AdminController(req, res, next).delete()
);

module.exports = adminRouter;
