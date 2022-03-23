const db = require('../config/db');

class UserStorage {
  static getUserRecord(email) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM users WHERE email=?';
      db.query(sql, [email], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }
}

module.exports = UserStorage;
