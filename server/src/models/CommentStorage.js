const db = require('../config/db');

class CommentStorage {
  static insert({ commentInput, postId, user_id }) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO comments (user_id, post_id, date, content) VALUES (?,?,now(),?)';
      db.query(sql, [user_id, postId, commentInput], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static select(id) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM comments WHERE post_id=?';
      db.query(sql, [id], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}

module.exports = CommentStorage;
