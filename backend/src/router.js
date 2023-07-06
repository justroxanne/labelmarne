const express = require('express');
const UserController = require('./controllers/UserController');

const router = express.Router();
const userController = new UserController({}, {});

router.post('/register', async (req, res) => {
  await userController.register(req, res);
});
router.post('/login', async (req, res) => { 
  await userController.login(req, res);
});

module.exports = router;
