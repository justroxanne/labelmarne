const express = require('express');
const UserController = require('../controllers/UserController'); // Assurez-vous que le chemin d'accès est correct
const { authorization, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/multer');

const userRouter = express.Router();

// Toutes les routes sont OK

userRouter.get('/users', async (req, res) =>
  new UserController(req, res).getAll()
);

userRouter.get('/users/:id', async (req, res, next) =>
  new UserController(req, res, next).getOne()
);

userRouter.put('/users/:id', async (req, res, next) =>
  new UserController(req, res, next).update()
);

userRouter.post(
  '/register',
  upload.single('profile_picture'),
  async (req, res) => new UserController(req, res).userRegistration()
);

userRouter.post('/login', async (req, res) => {
  new UserController(req, res).login();
});

userRouter.post('/users/:id/logout', async (req, res, next) =>
  new UserController(req, res, next).logout()
);

module.exports = userRouter;
