const User = require('../services/User');
const logger = require('../config/logger');

const ctrl = {
  view: {
    index: (req, res) => {
      logger.info('GET /');
      res.send('home');
    },
    blog: (req, res) => {
      res.send('blog');
    },
  },
  process: {
    checkAuth: (req, res) => {
      if (req.user) {
        res.json({ user: req.user.name });
      } else {
        res.redirect('/');
      }
    },
    login: async (req, res) => {
      let user = new User(req.body);
      let response = await user.login();
      if (response.success) {
        logger.info(`POST Login - idx:${response.idx} User: ${response.user}`);
        return res.cookie('user', response.token, { httpOnly: true }).status(200).json(response);
      }
      logger.info(`POST Login - failed`);
      return res.status(401).json({ response });
    },
    logout: (req, res) => {
      res.clearCookie('user');
      res.json({ success: true, message: 'Successfully logged out' });
    },
  },
};

module.exports = ctrl;
