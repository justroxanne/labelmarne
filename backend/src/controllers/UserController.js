const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const BaseController = require('./BaseController');
const fs = require('fs');
const { UserModel } = require('../models');
const upload = require('../middleware/multer');
require('dotenv').config();

class UserController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new UserModel();
  }

  async userRegistration() {
    const {
      address,
      complement,
      zip_code,
      city,
      company_name,
      firstname,
      lastname,
      siret,
      phone,
      email,
      password,
      website_url,
    } = this.req.body;

    try {
      if (
        !address ||
        !zip_code ||
        !city ||
        !company_name ||
        !firstname ||
        !lastname ||
        !siret ||
        !phone ||
        !email ||
        !password
      ) {
        throw new Error('Please fill in all the fields');
      }

      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
        hashLength: 50,
      });

      const addressData = {
        address,
        complement,
        zip_code,
        city,
      };

      const userData = {
        company_name,
        firstname,
        lastname,
        siret,
        phone,
        email,
        password: hashedPassword,
        website_url,
      };
      if (this.req.file) {
        userData.profile_picture = this.req.file.filename;
      }

      const [result] = await this.model.register(addressData, userData);

      this.res.status(200).json({
        message: 'User registered successfully',
        id: result.insertId,
        company_name: userData.company_name,
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
        website_url: userData.website_url,
        address: addressData.address,
        complement: addressData.complement,
        zip_code: addressData.zip_code,
        city: addressData.city,
        profile_picture: userData.profile_picture,
      });
    } catch (err) {
      if (this.req.file && this.req.file.path) {
        fs.unlinkSync(this.req.file.path);
      }
      console.error(err);
      this.res.status(500).json({ error: err.message });
    }
  }

  profile_picture() {
    //upload de l'image de profil
    return new Promise((resolve, reject) => {
      upload.single('profile_picture')(this.req, this.res, (err) => {
        //utilise le middleware multer
        if (err) {
          reject(err); //renvoie une erreur si il y a un problème
        } else {
          resolve(this.req.file ? this.req.file.path : null); //renvoie le chemin de l'image
        }
      });
    });
  }

  async login() {
    const { email, password } = this.req.body;

    try {
      if (!email || !password) {
        return this.res.status(400).json({
          error: 'Merci de saisir votre email ainsi que votre mot de passe.',
        });
      }

      const [result] = await this.model.getUserByEmail(email);
      console.log(result);

      if (!result) {
        return this.res.status(404).json({ error: 'User not found' });
      } else {
        const user = result[0];
        const hashedPassword = user.password;
        const passwordMatch = await argon2.verify(hashedPassword, password);

        if (!passwordMatch) {
          return this.res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const payload = { id: user.id };

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
            id: user.id,
            company_name: user.company_name,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            website_url: user.website_url,
            address_id: user.address_id,
            address: user.address,
            complement: user.complement,
            zip_code: user.zip_code,
            city: user.city,
            profile_picture: user.profile_picture,
          });
      }
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ error: err.message });
    }
  }

  logout() {
    this.res.clearCookie('token').json({ message: 'Logged out' });
  }
}

module.exports = UserController;
