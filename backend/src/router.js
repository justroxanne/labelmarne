const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/register', controllers.UserController.register);

module.exports = router;
