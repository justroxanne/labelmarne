const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
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

const isAdmin = (req, res, next) => {
  if (req.userRole !== 1) {
    return res.status(403).json({ error: 'Forbidden' });
  } else {
    next();
  }
};

export { authorization, isAdmin };