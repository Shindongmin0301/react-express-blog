const jwt = require('jsonwebtoken');
const createToken = require('../lib/createToken');
const UserStorage = require('../models/UserStorage');
require('dotenv').config();

const checkToken = async (req, res, next) => {
  const accessToken = req.cookies.user;
  const refreshToken = req.cookies.refresh;

  // 토큰이 없을때
  if (!refreshToken && !accessToken) return res.json({ success: false, message: 'Login please' });
  // access토큰이 만료됬을때
  if (!accessToken) {
    const refreshTokenRecord = await UserStorage.selectTokenAndUserinfo(refreshToken);
    // 새로운 access토큰 발급
    if (refreshToken === refreshTokenRecord.token) {
      console.log('새로운 토큰 발급');
      const { user_id, nickname } = refreshTokenRecord;
      const newAccessToken = await createToken.createAccessToken(nickname, user_id);
      res.cookie('user', newAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 15 });
      const userInfo = {
        nickname,
        user_id,
      };
      return res.json({ success: true, message: 'issued new access token', userInfo });
    }
  }

  const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
  if (decoded) {
    req.user = decoded;
    return next();
  }

  return res.json({ success: false, message: 'Token is expired' });
};

module.exports = checkToken;
