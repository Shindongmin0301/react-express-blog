const PostStorage = require('../models/PostStorage');

class Post {
  constructor(body) {
    this.body = body;
  }

  async selectPost() {
    try {
      const postsRecord = await PostStorage.selectPostRecords();
      return postsRecord;
    } catch (e) {
      return e;
    }
  }

  async selectPostOne() {
    const postId = this.body;
    try {
      const postRecord = await PostStorage.selectPostRecord(postId);
      return postRecord;
    } catch (e) {
      return e;
    }
  }

  async insertPost() {
    const body = this.body;
    try {
      const insertId = await PostStorage.insertPost(body);
      return { success: true, insertId };
    } catch (e) {
      return e;
    }
  }

  async deletePost() {
    const body = this.body;
    try {
      const deleteResult = await PostStorage.deletePost(body);
      if (deleteResult.affectedRows == 1) return { success: true, message: 'delete success' };
    } catch (e) {
      return e;
    }
  }

  async updatePost() {
    const body = this.body;
    try {
      const updateResult = await PostStorage.updatePost(body);
      if (updateResult.affectedRows == 1) return { success: true, message: 'Update success' };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

module.exports = Post;
