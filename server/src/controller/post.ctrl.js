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

    deletePost: async (req, res) => {
      if (req.user.user_id !== req.body.postAuthor) {
        return res.json({ success: false, message: 'Invalid request' });
      }
      const post = new Post(req.body);
      const response = await post.deletePost();
      return res.json(response);
    },

    updatePost: async (req, res) => {
      console.log(123123);
      if (req.user.user_id !== req.body.author) {
        return res.json({ success: false, message: 'Invalid request' });
      }
      const post = new Post(req.body);
      const response = await post.updatePost();
      return res.json(response);
    },
  },
};

module.exports = postCtrl;
