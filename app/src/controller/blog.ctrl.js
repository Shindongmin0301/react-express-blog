const Blog = require('../services/Blog');

const ctrl = {
  view: {
    loadPosts: async (req, res) => {
      const blog = new Blog();
      const response = await blog.loadPosts();
      return res.status(200).json(response);
    },
    loadPostOne: async (req, res) => {
      const idx = req.params.id;
      const blog = new Blog();
      const response = await blog.loadPostOne(idx);
      return res.status(200).json(response);
    },
  },
  process: {
    insertPost: async (req, res) => {
      req.body.authorIdx = req.user.idx;
      const blog = new Blog(req.body);
      const response = await blog.insertPost();
      return res.status(201).json(response);
    },
    updatePost: async (req, res) => {
      const blog = new Blog(req.body);
      const response = await blog.updatePost();
      return res.status(201).json(response);
    },
    deletePost: async (req, res) => {
      req.body.authorIdx = req.user.idx;
      parseInt(req.body.postIdx);
      const blog = new Blog(req.body);
      const response = await blog.deletePost();
      return res.status(301).json(response);
    },
  },
};

module.exports = ctrl;
