const db = require('../config/db');

class BlogModel {
  static loadPosts() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM blog';
      db.query(sql, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
  static loadPostOne(idx) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM blog WHERE post_idx=?';
      db.query(sql, [idx], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }
  static insertPost({ title, content, author }) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO blog (title,content,author) VALUES(?,?,?)';
      db.query(sql, [title, content, author], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}

module.exports = BlogModel;
