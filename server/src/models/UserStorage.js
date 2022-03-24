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

  static insertRefreshToken(user_id, token) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO authToken (user_id, token) VALUES (?,?) ON DUPLICATE KEY UPDATE token=?';
      db.query(sql, [user_id, token, token], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static deleteToken(user_id) {
    return new Promise((resolve, reject) => {
      let sql = 'DELETE FROM authToken WHERE user_id=?';
      db.query(sql, [user_id], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static selectTokenAndUserinfo(token) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT 
          users.name, authToken.token, authToken.user_id
        FROM
          authToken
            JOIN
          users ON authToken.token = ?;
        `;
      db.query(sql, [token], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }
}

module.exports = UserStorage;
