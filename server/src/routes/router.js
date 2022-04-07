const router = require('express').Router();
const postCtrl = require('../controller/post.ctrl');
const userCtrl = require('../controller/user.ctrl');
const commentCtrl = require('../controller/comment.ctrl');

const checkToken = require('../middlewares/checkToken');

router.get('/post', postCtrl.process.getPost);
router.get('/post-one', postCtrl.process.getPostOne);
router.get('/user/auth', checkToken, userCtrl.process.userInfo);
router.get('/comment', commentCtrl.process.selectComments);

router.post('/login', userCtrl.process.login);
router.post('/post/create', postCtrl.process.createPost);
router.post('/user/logout', userCtrl.process.logout);
router.post('/comment/add', checkToken, commentCtrl.process.createComment);
router.post('/user/register', userCtrl.process.register);
router.post('/user/findId', userCtrl.process.findId);
router.post('/user/find-nickname', userCtrl.process.findNickname);

router.delete('/post/delete', checkToken, postCtrl.process.deletePost);
router.put('/post/update', checkToken, postCtrl.process.updatePost);
module.exports = router;
