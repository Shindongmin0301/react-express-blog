const db = require('../config/db');

class BlogModel {
  static loadPosts() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM blog ORDER BY createDate DESC';
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
  static insertPost({ title, content, author, authorIdx }) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO blog (title,content,author,authorIdx) VALUES(?,?,?,?)';
      db.query(sql, [title, content, author, authorIdx], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static updatePost({ title, content, author, postIdx }) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE blog SET title=?, content=?,author=? WHERE post_idx=?';
      db.query(sql, [title, content, author, postIdx], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static deletePost({ authorIdx, postIdx }) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT 
          IF((SELECT 
                  blog.authorIdx
              FROM
                  blog
              WHERE
                  post_idx = ?) = ?,
          TRUE,
          FALSE) AS result;
  
      `;
      db.query(sql, [postIdx, authorIdx], (err, data) => {
        if (err) reject(err);
        if (data[0].result) {
          const sql = 'DELETE FROM blog WHERE post_idx=?';
          db.query(sql, [postIdx], (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        } else {
          return { success: false, message: 'Uncorrect request' };
        }
      });
    });
  }
}

module.exports = BlogModel;
