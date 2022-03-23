const User = require('../services/User');

const loginCtrl = {
  process: {
    login: async (req, res) => {
      const user = new User(req.body);
      const response = await user.login();
      res.json(response);
    },
  },
};

module.exports = loginCtrl;
