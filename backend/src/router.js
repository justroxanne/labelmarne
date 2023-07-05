const express = require('express');
const {
    AdminController,
  } = require('./controllers');

const router = express.Router();

router.post('/register-admin',(req,res) => new AdminController(req, res).register());

module.exports = router;
