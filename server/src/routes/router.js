const router = require('express').Router();
const postCtrl = require('../controller/post.ctrl');
const loginCtrl = require('../controller/login.ctrl');

const checkToken = require('../middlewares/checkToken');

router.get('/post', postCtrl.process.getPost);
router.get('/post-one', postCtrl.process.getPostOne);
router.get('/user/auth', checkToken, loginCtrl.process.userInfo);

router.post('/login', loginCtrl.process.login);
router.post('/post/create', postCtrl.process.createPost);
router.post('/user/logout', loginCtrl.process.logout);

module.exports = router;
