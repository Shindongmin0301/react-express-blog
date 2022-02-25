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
      return err.name + err.message;
    }
  }

  async loadPostOne(idx) {
    try {
      const BlogRecord = await BlogModel.loadPostOne(idx);
      return { success: true, message: 'Success load post', BlogRecord };
    } catch (err) {
      return err.name + err.message;
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

  async updatePost() {
    try {
      const updateResponse = await BlogModel.updatePost(this.body);
      if (updateResponse) return { success: true, message: 'Success update post' };
    } catch (err) {
      return { error: err.name + err.message };
    }
  }

  async deletePost() {
    try {
      const deleteResponse = await BlogModel.deletePost(this.body);
      if (deleteResponse)
        return {
          success: true,
          message: 'Success delete post',
        };
    } catch (err) {
      return err.name + err.message;
    }
  }
}

module.exports = Blog;
