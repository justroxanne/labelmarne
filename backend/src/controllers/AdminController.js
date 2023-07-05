const BaseController = require('./BaseController');
const models = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class AdminController extends BaseController {
async register(req, res) {
    const { email, password, firstname, lastname } = req.body;

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

      const adminData = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role_id: 1, // 1 = admin
      };

      const result = await models.AdminsModel.create(adminData);

      res.status(200).json({
        message: 'Admin registered successfully',
        id: result.insertId,
        ...adminData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Please specify both email and password' });
    }

    try {
      const admin = await models.AdminsModel.getOne(email);

      if (!admin) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await argon2.verify(admin.password, password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const payload = { id: admin.id, role: admin.role_id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ id: admin.id, email: admin.email, role_id: admin.role_id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  logout(req, res) {
    res.clearCookie('token').status(200).json({ message: 'Logged out' });
  }
}

module.exports =  AdminController;
