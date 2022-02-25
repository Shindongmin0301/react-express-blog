const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
// const token = require('../config/token');
require('dotenv').config();

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    let { email, password } = this.body;
    let userRecord = await UserModel.getUserRecord(email);
    if (userRecord === undefined) return { success: false, message: 'No user' };
    if (userRecord.password === password) {
      const token = jwt.sign({ idx: userRecord.idx, name: userRecord.name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
        issuer: 'express app',
      });
      return {
        success: true,
        message: 'Login Success',
        token,
        user: userRecord.name,
        idx: userRecord.idx,
      };
    } else {
      return { success: false, message: 'password is uncorrect' };
    }
  }
}
module.exports = User;
