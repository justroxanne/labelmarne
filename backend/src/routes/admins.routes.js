const express = require('express');
const upload = require('../middleware/multer');

const AdminController = require('../controllers/AdminController');
const { authorization, isAdmin } = require('../middleware/auth');

const adminRouter = express.Router();

adminRouter.get('/admins', authorization, isAdmin, async (req, res) =>
  new AdminController(req, res).getAll()
);

adminRouter.get('/admins/:id', authorization, isAdmin, async (req, res, next) =>
  new AdminController(req, res, next).getOne()
);

adminRouter.post('/admin-register', upload.single ('profile_picture'), async (req, res) =>
  new AdminController(req, res).register()
);

adminRouter.post('/admin-login', async (req, res) =>
  new AdminController(req, res).login()
);

adminRouter.put('/admin/:id', authorization, isAdmin, async (req, res, next) =>
  new AdminController(req, res, next).update()
);

adminRouter.delete(
  '/admin/:id',
  authorization,
  isAdmin,
  async (req, res, next) => new AdminController(req, res, next).delete()
);

module.exports = adminRouter;