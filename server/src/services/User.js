const UserStorage = require('../models/UserStorage');
const createToken = require('../lib/createToken');

require('dotenv').config();

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const { email, password } = this.body;
    try {
      const userRecord = await UserStorage.getUserRecord(email);
      if (!userRecord) return { success: false, message: 'login failed' };
      if (userRecord.password === password) {
        const { name, user_id } = userRecord;
        const refreshToken = await createToken.createRefreshToken();
        const accessToken = await createToken.createAccessToken(name, user_id);
        UserStorage.insertRefreshToken(user_id, refreshToken);

        const userInfo = {
          name: userRecord.name,
          user_id: userRecord.user_id,
        };
        return { success: true, userInfo, accessToken, refreshToken };
      } else return { success: false, message: 'login failed' };
    } catch (e) {
      return e;
    }
  }

  async logout() {
    const { user_id } = this.body;
    try {
      const result = await UserStorage.deleteToken(user_id);
      if (result) {
        return { success: true, message: 'successfully logged out' };
      }
    } catch (e) {
      return e;
    }
  }
}

module.exports = User;
