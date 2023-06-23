const models = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class AdminsController {
  static async register(req, res) {
    const { firstname, lastname, email, password } = req.body;

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
        role_id: 1, // 1 = admin,
      };

      const [result] = await models.admins.create(adminData);

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

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Please specify both email and password' });
    }

    try {
      const [admin] = await models.admins.getOne(email);

      if (!admin) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      constpasswordMatch = await argon2.verify(admin.password, password);

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
        .json({ id, email, role_id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static logout = (req, res) => {
    res.clearCookie('token').status(200).json({ message: 'Logged out' });
  };
}

module.exports = AdminsController;
