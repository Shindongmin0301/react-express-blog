const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(data) {
  jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
    issuer: 'express app',
  });
}

module.exports = createToken;
