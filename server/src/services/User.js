const UserStorage = require('../models/UserStorage');
const createToken = require('../lib/createToken');

require('dotenv').config();

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const { id, password } = this.body;
    try {
      const userRecord = await UserStorage.getUserRecord(id);
      if (!userRecord) return { success: false, message: 'login failed' };
      if (userRecord.password === password) {
        console.log(userRecord);
        const { nickname, user_id } = userRecord;
        const refreshToken = await createToken.createRefreshToken();
        const accessToken = await createToken.createAccessToken(nickname, user_id);
        UserStorage.insertRefreshToken(user_id, refreshToken);

        const userInfo = {
          nickname: userRecord.nickname,
          user_id: userRecord.user_id,
        };
        return { success: true, userInfo, accessToken, refreshToken };
      } else return { success: false, message: 'login failed' };
    } catch (e) {
      console.log(e);
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

  async register() {
    try {
      const result = await UserStorage.insertUser(this.body);
      if (result.affectedRows === 1) {
        return { success: true, message: 'Successfully signed up' };
      }
    } catch (e) {
      return e;
    }
  }

  async findId() {
    try {
      const result = await UserStorage.selectId(this.body);
      if (result === undefined) return { success: true, message: 'you can use this id' };
      return { success: false, message: 'Already exist id' };
    } catch (e) {
      return e;
    }
  }
  async findNickname() {
    try {
      const result = await UserStorage.selectNickname(this.body);
      if (result === undefined) return { success: true, message: 'you can use this nickname' };
      return { success: false, message: 'Already exist nickname' };
    } catch (e) {
      return e;
    }
  }
}

module.exports = User;
