const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.cookies.user;
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded) {
      req.user = decoded;
      return next();
    }
  } catch (err) {
    res.status(200).json({ success: false, message: `Access denied (${err.name}: ${err.message})` });
  }
}
module.exports = authenticateToken;
