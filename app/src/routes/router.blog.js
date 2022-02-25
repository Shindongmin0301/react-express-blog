const router = require('express').Router();
const blogCtrl = require('../controller/blog.ctrl');

router.get('/', blogCtrl.view.loadPosts);
router.get('/find-one/:id', blogCtrl.view.loadPostOne);
router.post('/create', blogCtrl.process.insertPost);

module.exports = router;
