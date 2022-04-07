const jwt = require('jsonwebtoken');

// const createToken = (user_id, name) => {
// return new Promise((resolve, reject) => {
//   //refresh token
//   const refreshToken = jwt.sign({}, process.env.SECRET_REFRESH_TOKEN, {
//     expiresIn: '14d',
//     issuer: 'express-blog',
//   });

//     //access token
//     const accessToken = jwt.sign({ user_id, name }, process.env.SECRET_ACCESS_TOKEN, {
//       expiresIn: '15m',
//       issuer: 'express-blog',
//     });

//     resolve({ accessToken, refreshToken });
//   });
// };

// module.exports = createToken;

const createToken = {
  createRefreshToken: () => {
    return new Promise((resolve, reject) => {
      const refreshToken = jwt.sign({}, process.env.SECRET_REFRESH_TOKEN, {
        expiresIn: '14d',
        issuer: 'express-blog',
      });
      resolve(refreshToken);
    });
  },

  createAccessToken: (nickname, user_id) => {
    return new Promise((resolve, reject) => {
      const accessToken = jwt.sign({ nickname, user_id }, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: '15m',
        issuer: 'express-blog',
      });
      resolve(accessToken);
    });
  },
};

module.exports = createToken;
