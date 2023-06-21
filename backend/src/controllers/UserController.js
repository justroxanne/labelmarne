const models = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class UserController {
  static async register(req, res) {
    const {
      company_name,
      firstname,
      lastname,
      siret,
      phone,
      email,
      password,
      website_url,
    } = req.body;

    try {
      if (
        !email ||
        !password ||
        !company_name ||
        !firstname ||
        !lastname ||
        !siret ||
        !phone ||
        !website_url
      ) {
        throw new Error('Please fill all the fields');
      }

      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
        hashLength: 50,
      });

      const userData = {
        company_name,
        firstname,
        lastname,
        siret,
        phone,
        email,
        password: hashedPassword,
        website_url,
        role_id: 2,
      };

      const [result] = await models.user.create(userData);

      res.status(200).json({
        message: 'User registered successfully',
        id: result.insertId,
        ...userData,
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
      const [user] = await models.user.findByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const passwordMatch = await argon2.verify(user.password, password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const payload = { id: user.id, role: user.role_id };

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
      req.userId = data.id;
      req.userRole = data.role_id;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };

  static isAdmin = (req, res, next) => {
    if (req.userRole !== 1) {
      return res.status(403).json({ error: 'Forbidden' });
    } else {
      next();
    }
  };

  static logout(req, res) {
    res.clearCookie('token').json({ message: 'Logged out' });
  }

  static async editUser(req, res) {
    const user = req.body;

    user.id = parseInt(req.params.id, 10);

    try {
      const [result] = await models.user.update(user);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', ...user });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  static async deleteUser(req, res) {
    try {
      await models.user.delete(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = UserController;
