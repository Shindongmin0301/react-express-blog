const BlogModel = require('../models/BlogModel');

class Blog {
  constructor(body) {
    this.body = body;
  }

  async loadPosts() {
    try {
      const BlogRecord = await BlogModel.loadPosts();
      return { success: true, message: 'Success load posts', BlogRecord };
    } catch (err) {
      return err;
    }
  }

  async loadPostOne(idx) {
    try {
      const BlogRecord = await BlogModel.loadPostOne(idx);
      return { success: true, message: 'Success load post', BlogRecord };
    } catch (err) {
      return err;
    }
  }

  async insertPost() {
    try {
      const insertResponse = await BlogModel.insertPost(this.body);
      if (insertResponse) {
        return { success: true, message: 'Success create post', postIdx: insertResponse.insertId };
      }
    } catch (err) {
      return err.name + err.message;
    }
  }
}

module.exports = Blog;
