const Post = require('../services/Post');

const postCtrl = {
  process: {
    getPost: async (req, res) => {
      const post = new Post();
      const response = await post.selectPost();
      return res.json(response);
    },
    getPostOne: async (req, res) => {
      const { postId } = req.query;
      const post = new Post(postId);
      const response = await post.selectPostOne();
      return res.json(response);
    },

    createPost: async (req, res) => {
      const post = new Post(req.body);
      const response = await post.insertPost();
      return res.json(response);
    },
  },
};

module.exports = postCtrl;
