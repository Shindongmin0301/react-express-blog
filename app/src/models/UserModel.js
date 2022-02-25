const db = require('../config/db');

class UserModel {
  static getUserRecord(email) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM users WHERE email=?';
      db.query(sql, [email], (err, data) => {
        if (err) reject(err);
        resolve(data[0]);
      });
    });
  }
}

module.exports = UserModel;
