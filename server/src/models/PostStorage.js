const db = require('../config/db');

class PostStorage {
  static selectPostRecords() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM posts', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static selectPostRecord(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM posts WHERE post_id=?', [id], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static insertPost({ title, content, author }) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO posts (title, content, author) VALUES (?,?,?);';
      db.query(sql, [title, content, author], (err, data) => {
        if (err) reject(err);
        else resolve(data.insertId);
      });
    });
  }
}

module.exports = PostStorage;
