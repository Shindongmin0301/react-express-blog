const CommentStorage = require('../models/CommentStorage');

class Comment {
  constructor(body) {
    this.body = body;
  }

  async createComment() {
    const insertComment = await CommentStorage.insert(this.body);
    if (insertComment.affectedRows === 1)
      return {
        success: true,
        message: 'Successfully insert comment',
      };
  }

  async getComment() {
    const selectComment = await CommentStorage.select(this.body);
    return selectComment;
  }
}

module.exports = Comment;
