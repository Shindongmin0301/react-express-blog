const Comment = require('../services/Comment');

const commentCtrl = {
  process: {
    createComment: async (req, res) => {
      req.body.user_id = req.user.user_id;
      const comment = new Comment(req.body);
      const response = await comment.createComment();
      return res.json(response);
    },
    selectComments: async (req, res) => {
      const id = req.query.postId;
      const comment = new Comment(id);
      const response = await comment.getComment();
      return res.json(response);
    },
  },
};

module.exports = commentCtrl;
