const express = require('express');
const AdminController = require('../controllers/AdminController');

const routerAdd = express.Router();
const adminController = new AdminController({}, {});

module.exports = routerAdd;