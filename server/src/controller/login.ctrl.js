const User = require('../services/User');

const loginCtrl = {
  process: {
    login: async (req, res) => {
      const user = new User(req.body);
      const response = await user.login();
      // access token 만료 15분
      res.cookie('user', response.accessToken, { httpOnly: true, maxAge: 1000 * 60 * 15 });
      // refresh token 만료 14일
      res.cookie('refresh', response.refreshToken, { httpOnly: true, maxAge: 3600000 * 24 * 14 });
      res.json({ success: true, userInfo: response.userInfo });
    },
    userInfo: (req, res) => {
      if (req.user) {
        const userInfo = {
          name: req.user.name,
          user_id: req.user.user_id,
        };
        res.json({ success: true, userInfo });
      }
    },
    logout: async (req, res) => {
      const user = new User(req.body);
      const response = await user.logout();
      if (!response.success) return response;
      res.clearCookie('user');
      res.clearCookie('refresh');
      return res.status(200).json({ success: true, message: 'logged out!' });
    },
  },
};

module.exports = loginCtrl;
