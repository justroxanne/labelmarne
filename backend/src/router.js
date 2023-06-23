const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/register', controllers.UsersController.register);

module.exports = router;
