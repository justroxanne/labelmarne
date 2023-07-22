const BaseController = require('./BaseController');
const fs = require('fs');//pour supprimer l'image
const upload = require('../middleware/multer');//pour l'upload de l'image de profil
const { AdminModel } = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AdminController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new AdminModel();
  }

  async register() {
    const { 
      email, 
      password, 
      firstname, 
      lastname,
    } = this.req.body;

    try {//vérifie que tous les champs sont remplis
      if (!email || 
        !password || 
        !firstname || 
        !lastname 
         ) {
          console.log(email, password, firstname, lastname, profile_picture)
          console.log(this.req.file)
        throw new Error('Please fill all the fields');
      }

      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
        hashLength: 50,
      });

      const username = firstname.slice(0, 1) + lastname + '-admin';

      const adminData = {//crée un objet avec les données de l'admin
        firstname,
        lastname,
        username: username,
        email,
        password: hashedPassword,
      }
      if (this.req.file && this.req.file.path) {
        adminData.profile_picture = this.req.file.path;
      }

      const [result] = await this.model.create(adminData);

      this.res.status(200).json({//renvoie les données de l'admin
        message: 'Admin registered successfully',
        id: result.insertId,
        username: adminData.username,
        email: adminData.email,
        firstname: adminData.firstname,
        lastname: adminData.lastname,
        profile_picture: adminData.profile_picture,
      });
    } catch (err) {
      if (this.req.file && this.req.file.path) {
        fs.unlinkSync(this.req.file.path);
      }
      console.log(err);
      this.res.status(500).json({ error: err.message });
    }
  }
  

  profile_picture() {//upload de l'image de profil
    return new Promise((resolve, reject) => {
      upload.single('profile_picture')(this.req, this.res, (err) => {//utilise le middleware multer
        if (err) {
          reject(err);//renvoie une erreur si il y a un problème
        } else {
          resolve(this.req.file ? this.req.file.path : null);//renvoie le chemin de l'image
        }
      });
    });
  }

  async login() {
    const { username, password } = this.req.body;

    if (!username || !password) {
      return this.res.status(400).json({
        error:
          "Merci de saisir votre nom d'utilisateur ainsi que votre mot de passe.",
      });
    }
      const adminUsername = {username}

    try {

      const [admin] = await this.model.getOne(adminUsername);
      
      if (!admin) {
        return this.res.status(400).json({ error: 'Invalid credentials' });
      }else{
        const loggedInAdmin = admin[0];
        const hashedPassword = loggedInAdmin.password;
        const passwordMatchAdmin = await argon2.verify(hashedPassword, password);
      
        if (!passwordMatchAdmin) {
          return this.res.status(401).json({error:'Mot de passe incorrect'});
      }
console.log(loggedInAdmin)
      const payload = { id: loggedInAdmin.id };

      const token = jwt.sign(payload, process.env.JWT_AUTH_SECRET, {
        expiresIn: '1h',
      });

      this.res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ 
          id: loggedInAdmin.id, 
          email: loggedInAdmin.email,
          firstname: loggedInAdmin.firstname,
          lastname: loggedInAdmin.lastname,
          profile_picture: loggedInAdmin.profile_picture,
          });
        }
   
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ error: err.message });
    }
  }

  logout() {
    this.res.clearCookie('token').status(200).json({ message: 'Logged out' });
  }
}

module.exports = AdminController;