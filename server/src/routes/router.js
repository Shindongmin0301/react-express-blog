const router = require('express').Router();
const postCtrl = require('../controller/post.ctrl');
const loginCtrl = require('../controller/login.ctrl');

router.get('/post', postCtrl.process.getPost);
router.get('/post-one', postCtrl.process.getPostOne);

router.post('/login', loginCtrl.process.login);
router.post('/post/create', postCtrl.process.createPost);

module.exports = router;
