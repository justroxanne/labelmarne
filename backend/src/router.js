const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/register', controllers.UsersController.register);

router.post('/register-admin', controllers.AdminsController.register);
router.post('/login-admin', controllers.AdminsController.login);

module.exports = router;
