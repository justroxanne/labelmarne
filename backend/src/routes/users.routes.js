const express = require('express');
const UserController = require('../controllers/UserController'); // Assurez-vous que le chemin d'accès est correct
const { authorization, isAdmin } = require('..//middleware/auth');

const userRouter = express.Router();

userRouter.get('/users', async (req, res) => {
  new UserController(req, res).getAll();
}); //Routes Ok

userRouter.get('/users/:id', async (req, res, next) =>
  new UserController(req, res, next).getOne()
); //Routes Ok

userRouter.put('/users/:id', authorization, isAdmin, async (req, res, next) =>
  new UserController(req, res, next).update()
); //Routes Ok

userRouter.post('/register', async (req, res) =>
  new UserController(req, res).register()
);
//!!!!!probleme avec adresse_id qui est une clé étrangère 'fk_adresse_id' dans la table users les contraintes ne sont pas respectées

userRouter.post('/login', async (req, res) => {
  new UserController(req, res).login();
}); //  "error": "Erreur de syntaxe près de ',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 = 'j,o,h,n,@,e,x,a,m,p,l,e,.,c,o,m'' à la ligne 1"

module.exports = userRouter;
