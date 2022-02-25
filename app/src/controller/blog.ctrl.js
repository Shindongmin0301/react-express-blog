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
      const blog = new Blog(req.body);
      const response = await blog.insertPost();
      console.log(response);
      return res.status(201).json(response);
    },
  },
};

module.exports = ctrl;
