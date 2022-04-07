const User = require('../services/User');

const userCtrl = {
  process: {
    login: async (req, res) => {
      const user = new User(req.body);
      const response = await user.login();
      if (response.success) {
        // access token 만료 15분
        res.cookie('user', response.accessToken, { httpOnly: true, maxAge: 1000 * 60 * 15 });
        // refresh token 만료 14일
        res.cookie('refresh', response.refreshToken, { httpOnly: true, maxAge: 3600000 * 24 * 14 });
        res.json({ success: true, userInfo: response.userInfo });
      } else {
        res.json(response);
      }
    },
    userInfo: (req, res) => {
      if (req.user) {
        const userInfo = {
          nickname: req.user.nickname,
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
    register: async (req, res) => {
      const user = new User(req.body);
      const response = await user.register();
      return res.json(response);
    },
    findId: async (req, res) => {
      const user = new User(req.body);
      const response = await user.findId();
      return res.json(response);
    },
    findNickname: async (req, res) => {
      const user = new User(req.body);
      const response = await user.findNickname();
      return res.json(response);
    },
  },
};

module.exports = userCtrl;
