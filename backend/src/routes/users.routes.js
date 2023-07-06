const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); // Assurez-vous que le chemin d'accès est correct

router.get('/users', async (req, res) => {
  const userController = new UserController(req, res);
  await userController.getAll();
});//Routes Ok

// router.post('/register', async (req, res) => {
//   const userController = new UserController(req, res);
//   await userController.register();
// });

router.post('/login', async (req, res) => {
  const userController = new UserController(req, res);
  await userController.login();
});//"error": "pchstr must be a non-empty string" => pb de token

module.exports = router;
