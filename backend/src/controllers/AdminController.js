const models = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class AdminController {
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

      const [result] = await models.user.create(adminData);

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
      const [admin] = await models.user.findByEmail(email);

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

  static authorization = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.adminId = data.id;
      req.adminRole = data.role_id;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

  static isAdmin = (req, res, next) => {
    if (req.adminRole !== 1) {
      return res.status(403).json({ error: 'Forbidden' });
    } else {
      next();
    }
  };

  static logout = (req, res) => {
    res.clearCookie('token').status(200).json({ message: 'Logged out' });
  };

  static async editAdmin(req, res) {
    const admin = req.body;

    admin.id = parseInt(req.params.id);

    try {
      const [result] = await models.user.update(admin);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      res.status(200).json({ message: 'Admin updated successfully', ...admin });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  static async deleteAdmin(req, res) {
    try {
      await models.user.delete(req.params.id);
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = AdminController;
