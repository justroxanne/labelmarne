const BaseController = require('./BaseController');
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
    const { email, password, firstname, lastname } = this.req.body;

    try {
      if (!email || !password || !firstname || !lastname) {
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

      const adminData = {
        firstname,
        lastname,
        username: username,
        email,
        password: hashedPassword,
      };

      const [result] = await this.model.create(adminData);

      this.res.status(200).json({
        message: 'Admin registered successfully',
        id: result.insertId,
        username: adminData.username,
      });
    } catch (err) {
      console.error(err);
      this.res.status(500).json({ error: err.message });
    }
  }

  async login() {
    const { username, password } = this.req.body;

    if (!username || !password) {
      return this.res.status(400).json({
        error:
          "Merci de saisir votre nom d'utilisateur ainsi que votre mot de passe.",
      });
    }

    try {
      const admin = await this.model.getOne(username);

      if (!admin) {
        return this.res.status(400).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await argon2.verify(admin.password, password);

      if (!passwordMatch) {
        return this.res.status(401).json({ error: 'Mot de passe incorrect' });
      }

      const payload = { id: admin.id, role: admin.role_id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      this.res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ id: admin.id, email: admin.email, role_id: admin.role_id });
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
