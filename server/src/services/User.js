const UserStorage = require('../models/UserStorage');

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const { email, password } = this.body;
    try {
      const userRecord = await UserStorage.getUserRecord(email);
      if (!userRecord) return { success: false, message: 'login failed' };

      if (userRecord.email === email) return { success: true, userRecord };
      else return { success: false, message: 'login failed' };
    } catch (e) {
      return e;
    }
  }
}

module.exports = User;
