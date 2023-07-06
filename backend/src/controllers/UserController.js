const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const BaseController = require('./BaseController');
const { UserModel } = require('../models');

class UserController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.model = new UserModel();
  }

  async register() {
    const {
      raison_sociale,
      firstname,
      lastname,
      siret,
      telephone, //a modifier!!!
      email,
      password,
      site_web_url, //a modifier!!!
    } = req.body;

    try {
      if (
        !email ||
        !password ||
        !raison_sociale ||
        !firstname ||
        !lastname ||
        !siret ||
        !telephone //a modifier!!!
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

      const userData = {
        raison_sociale, //a modifier!!!
        firstname,
        lastname,
        siret,
        telephone, //a modifier!!!
        email,
        password: hashedPassword,
        site_web_url, //a modifier!!!
        role_id: 2,
      };

      const [result] = await models.UserModel.create(userData);

      this.res.status(200).json({
        message: 'User registered successfully',
        id: result.insertId,
        ...userData,
      });
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ error: err.message });
    }
    
  }


  async login() {
    const { email, password } = this.req.body;
 
    if (!email || !password) {
      return this.res
        .status(400)
        .json({ error: 'Please provide both email and password' });
    }

    try {
      const [user] = await this.model.getOne({ email: email });

      if (!user) {
        return this.res.status(404).json({ error: 'User not found' });
        
      }
     
      const passwordMatch = await argon2.verify(user.password, password);

      if (!passwordMatch) {
        return this.res.status(401).json({ error: 'Incorrect password' });
      }

      const payload = { id: user.id, role: user.role_id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      this.res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ id: user.id, email: user.email, role_id: user.role_id });
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
